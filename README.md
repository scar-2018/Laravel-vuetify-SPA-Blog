# Laravel-Vue-SPA-Blog

## Tech
- [Laravel 8.4.0](https://laravel.com/) The PHP Framework for Web Artisans
- [Vue: 2.6.12](https://vuejs.org/)The Progressive JavaScript Framework
- [Vuetify 2.5.0](https://vuetifyjs.com/en/)Material Design Framework

## Features
##### *backend*
- [API Resource route](https://laravel.com/docs/8.x/eloquent-resources)
- [Authentication using laravel passport](https://laravel.com/docs/8.x/passport)
- [API resource](https://laravel.com/docs/8.x/eloquent-resources)
##### *frontend*
- [Vuetify](https://vuetifyjs.com/en/) Vuetify components and responsive pages on all devices
- [vue-router](https://router.vuejs.org/guide/) Vue router and frontend middleware
- [vuex modules](https://vuex.vuejs.org/)

## Functionalities to be added later
- Multi User roles
- Unit Test

## Installation
1. Download source code
```sh
git clone https://github.com/scar-2018/Laravel-vue-SPA-Blog.git
```
2. Go to created directory
3. Download PHP packages
```sh
composer install
```
4. Config .env file from .env.sample
5. Generate key
```sh
php artisan key:generate
```
6. Install laravel passport and config
```sh
php artisan passport:install
php artisan vendor:publish --tag=passport-config
```
7. Setup database
```sh
php artisan migrate:seed
```
8. Install the dependencies and devDependencies
```sh
npm install
```
8. Build assets
```sh
npm run dev
```
## Admin credentials
- email: admin@admin.com
- password: password
