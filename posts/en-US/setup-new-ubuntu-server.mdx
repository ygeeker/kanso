---
title: Setting Up Fresh Ubuntu Server for Web Hosting
date: 2023-11-19T02:21:00.000Z
summary: A breif 5-mins guide for setting up new server.
tag: Coding
---




I recently purchased a new Ubuntu server for my startup. Here's a concise guide, taking about 5 minutes, to set it up.

Setting up a new server can be quite rewarding. Following these steps, your server will be ready to host a web app created with Node.js and Nginx, and it can synchronize with your existing repository if necessary.

First, let's update the apt package list by running:

```bash
sudo apt update
```

## Enable essential ports

In your provider’s panel, enable these ports:
- 80 for http
- 443 for https
- 22 for ssh

## Install Nginx

Execute the command below to install Nginx, a popular web server:

```bash
sudo apt install nginx
```

To verify the Nginx service status, use:

```bash
systemctl status nginx
```

A successful installation will display output similar to this:

```bash
nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2023-11-19 10:20:28 CST; 10min ago
       Docs: man:nginx(8)
   Main PID: 17963 (nginx)
      Tasks: 3 (limit: 1939)
     Memory: 3.8M
        CPU: 31ms
     CGroup: /system.slice/nginx.service
             ├─17963 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─17964 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             └─17965 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
```

## Install Node framework

Run these commands to install Node.js and npm:

```bash
sudo apt install nodejs
sudo apt install npm

npm install yarn --global #Optional
```

Verify the installations with:

```bash
node -v
npm -v
```

To update Node.js (recommended to version 16 or later), execute:

```bash
sudo npm install -g n
sudo n stable # This will automatically install the latest stable version of node
```

## Install Git

Run this command if git not installed.

```bash
sudo apt install git
```

Next, let’s generate the ssh key. Skip this step if you do not need to work with your remote repo on this server.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Retrieve the public key with:

```bash
cat /root/.ssh/id_ed25519.pub
# or
vim /root/.ssh/id_ed25519.pub
```

Add this key to your GitHub account under [SSH keys settings](https://github.com/settings/keys).

## Install PM2

To manage our process we can use PM2. 

```bash
npm install pm2 -g
```

Now you can start your project. Switch to your projecy directory, and run:

```bash
pm2 start yarn --name "ygeeker-website" -- start
```

Replace “yarn” and second “start” with your actuall command.

## Config Nginx & SSL

⚠️  Note: Replace '[ygeeker.com.cn](http://ygeeker.com.cn/)' with your domain.

Create the Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/ygeeker.com.cn
```

Type in the website config:

```bash
server {
    listen 80;
    listen [::]:80;
    server_name ygeeker.com.cn;

    root /var/www/ygeeker.com.cn/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name www.ygeeker.com.cn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Create a symbolic link to enable this configuration:

```bash
sudo ln -s /etc/nginx/sites-available/ygeeker.com.cn /etc/nginx/sites-enabled/
```

It’s not recommended to directly create config file under sites-enabled directory.

To dive  deeper about symbolic link on Linux you could read Understanding Linux Kernel.

```bash
sudo snap install --classic certbot
sudo certbot --nginx -d <your_domain> # Generate Certificate
```

Ensure DNS settings are correctly configured to point to your server.

For more on Certbot, visit this [page](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal).

## Use Github action for automention

We’ll create a github action to let the production always use latest code from master branch. Let’s start with writting github action file.

Create a sync-to-server.yml under .github/workflows

```bash
name: Sync to Server

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: SSH and deploy node app
        uses: appleboy/ssh-action@master
        with:
            host: ${{ secrets.SSH_HOST }}
            username: ${{ secrets.SSH_USERNAME }}
            password: ${{ secrets.SSH_PASSWORD }}
            port: ${{ secrets.SSH_PORT || '22' }}
            fail_on_stderr: true
            script: |
                cd /home/app/YGeeker_Website
                rm -rf yarn.lock
                git pull origin main
                yarn --production
                yarn run build
                kill $(lsof -t -i:3000)
                pm2 restart 0 || pm2 start yarn --name "ygeeker-website" -- start
```

Then enable action for your github repo on this page. 

In your github repo, create three environemnt varibles for SSH connection at this page:

![Image](/image/post/145962c0-71f0-49bb-8f2e-3bcbe73f476f_Screenshot_2023-11-28_at_08.58.02.png)



## Further

To maximize your server’s capabilities, consider:
- Hosting a Jitsi Meet video conference service
- Running a Minecraft server
- Setting up a media streaming service with Jellyfin or Plex
- And more…


