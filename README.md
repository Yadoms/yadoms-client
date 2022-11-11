# Nx Generation command

## Generate a library 
```
npx nx generate @nrwl/angular:library --name=core --style=scss --importPath=@yadoms/core
```

if needed to run in debug mode to see the path of generated/edited files please add `--dry-run` at the end of the command before

## Generate a feature library

```
npx nx generate @nrwl/angular:library --name=features/plugins --style=scss --importPath=@yadoms/features/plugins --dry-run
portPath=@yadoms/features/plugins
```
