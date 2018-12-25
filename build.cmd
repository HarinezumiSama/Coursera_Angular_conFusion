@echo off

"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -ExecutionPolicy RemoteSigned -NonInteractive -Command "& '%~dpn0.ps1'"