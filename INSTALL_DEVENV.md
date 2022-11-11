# Install development environnement

Angular framework is based on nodejs and npm.
Both must be installed on computer.
It can be done manually and using nvm:node version manager (recommanded)

## NVM installation

### Windows

1. Install https://github.com/coreybutler/nvm-windows/releases

2. Setup proxy (if needed)
   From a command prompt, type:

```bash
nvm proxy http://monproxy.aaaa.fr:8080
```

3. Install node and npm

```bash
nvm install latest
```

4. Use latest version
   From elevated command prompt

```bash
nvm use latest
```

5. Check

```bash
node -v
npm -v
```

## Angular CLI

The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications directly from a command shell.

```bash
# install in global (aka system wide installation, with "-g")
npm install -g @angular/cli
```

Check it wokrs

```bash
ng --help
```
