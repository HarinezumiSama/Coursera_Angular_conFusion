#Requires -Version 5

using namespace System
using namespace System.Collections.Generic
using namespace System.Diagnostics
using namespace System.IO
using namespace System.IO.Compression
using namespace System.Management.Automation

[CmdletBinding(PositionalBinding = $false)]
param
(
    [Parameter()]
    [string] $WebAppDir = $PSScriptRoot,

    [Parameter()]
    [string] $Configuration = 'Debug',

    [Parameter()]
    [string] $OutputDir = $([Path]::Combine($PSScriptRoot, 'bin'))
)
begin
{
    $Script:ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
    Set-StrictMode -Version 1

    function Get-ErrorDetails([ValidateNotNull()] [System.Management.Automation.ErrorRecord] $error = $_)
    {
        [ValidateNotNull()] [System.Exception] $exception = $error.Exception
        while ($exception -is [System.Management.Automation.RuntimeException] -and $exception.InnerException -ne $null)
        {
            $exception = $exception.InnerException
        }

        return "$($exception.GetType().FullName): $($exception.Message)$([System.Environment]::NewLine)$($error.ScriptStackTrace)"
    }

    function Get-ApplicationPath
    {
        [CmdletBinding(PositionalBinding = $false)]
        param
        (
            [Parameter(ValueFromPipeline = $true, Position = 0)]
            [string] $Name
        )
        process
        {
            if ([string]::IsNullOrWhiteSpace($Name))
            {
                throw [ArgumentException]::new("The application name must be specified.", 'Name')
            }

            [string[]] $paths = (Get-Command $Name -CommandType Application -ErrorAction SilentlyContinue).Definition
            [string] $path = if ($paths -ne $null -and $paths.Count -ne 0) { $paths[0] } else { $null }
            if ([string]::IsNullOrEmpty($path))
            {
                if ($ErrorActionPreference -ne [ActionPreference]::SilentlyContinue)
                {
                    throw "The application ""$Name"" is not found."
                }

                return $null
            }

            Write-Verbose "Application ""$Name"" has been resolved to ""$path""."

            return $path
        }
    }

    function Execute-ExternalCommand
    {
        [CmdletBinding(PositionalBinding = $false)]
        param
        (
            [Parameter()]
            [string] $Title,

            [Parameter()]
            [string] $Command,

            [Parameter(ValueFromRemainingArguments = $true)]
            [string[]] $CommandArguments = @()
        )

        if ([string]::IsNullOrWhiteSpace($Title))
        {
            throw [ArgumentException]::new("The command title must be specified.", 'Title')
        }
        if ([string]::IsNullOrWhiteSpace($Command))
        {
            throw [ArgumentException]::new("The command must be specified.", 'Command')
        }
        if ($CommandArguments -eq $null)
        {
            throw [ArgumentNullException]::new('CommandArguments')
        }

        Write-Host ''
        Write-Host "${Title}..." -ForegroundColor Cyan

        Write-Verbose -Verbose "Executing <""$Command"" $CommandArguments>"

        $ErrorActionPreference = [System.Management.Automation.ActionPreference]::SilentlyContinue
        & cmd /c """$Command"" $CommandArguments" 2`>`&1
        [int] $exitCode = $LASTEXITCODE
        $ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

        if ($exitCode -ne 0)
        {
            throw "${Title} - FAILED (exit code: ${exitCode})."
        }

        Write-Host "${Title} - DONE." -ForegroundColor Cyan
    }
}
process
{
    $Script:ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
    Set-StrictMode -Version 1

    if ([string]::IsNullOrWhiteSpace($WebAppDir))
    {
        throw [ArgumentException]::new("The path to the source directory of the Web application must be specified.", 'WebAppDir')
    }
    if ([string]::IsNullOrWhiteSpace($Configuration))
    {
        throw [ArgumentException]::new("The project configuration must be specified.", 'Configuration')
    }
    if ([string]::IsNullOrWhiteSpace($OutputDir))
    {
        throw [ArgumentException]::new("The path to the output directory must be specified.", 'OutputDir')
    }

    Write-Host ''
    Write-Host '*** Building the Web application...'
    Write-Host ''
    Write-Host "WebAppDir = ""$WebAppDir"""
    Write-Host "Configuration = ""$Configuration"""
    Write-Host "OutputDir = ""$OutputDir"""
    Write-Host ''

    [string] $originalPath = (Get-Location).Path
    try
    {
        Set-Location -LiteralPath $WebAppDir

        [string] $npmPath = Get-ApplicationPath npm

        Execute-ExternalCommand -Title "* Install NPM packages" -Command $npmPath install --verbose

        Write-Host ''

        [string] $ngPath = Get-ApplicationPath ([Path]::Combine($WebAppDir, 'node_modules\.bin\ng.cmd'))

        [string[]] $ngArguments = `
        @(
            "build",
            "--output-path",
            """$OutputDir"""
        )

        if ($Configuration -ieq 'Release')
        {
            $ngArguments += "--prod"
        }
        else
        {
            $ngArguments += "--source-map=true"
        }

        Execute-ExternalCommand -Verbose -Title "* Build Angular application" -Command $ngPath -CommandArguments $ngArguments
    }
    catch
    {
        [string] $errorDetails = Get-ErrorDetails

        Write-Host "*** ERROR: $errorDetails" -ForegroundColor Red
        Write-Host ''

        exit 1
    }
    finally
    {
        Set-Location -LiteralPath $originalPath
    }

    Write-Host ''
    Write-Host '*** Building the Web application - DONE.'
    Write-Host ''

    exit 0
}