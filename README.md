<p align="center">
  <a href="https://github.com/one-tab-group/bookmark.style">
    <img src="/public/favicon.svg" width="152">
  </a>
  <h3 align="center">
    <a href="https://github.com/one-tab-group/bookmark.style">
      bookmark.style
    </a>
  </h3>
  <br>
  <p align="center">
    <a href="https://bookmark.style"><img src="https://img.shields.io/website?color=%230ea5e9&down_color=%230ea5e9&down_message=app&label=Bookmark.style&style=for-the-badge&up_color=%230ea5e9&up_message=app&url=https%3A%2F%2Fwww.bookmark.style%2F"></a>
    <a href="https://chrome.google.com/webstore/detail/web-visual-bookmark/jcfidgjldodhkpiebmemhnhgpgdakham/"><img src="https://img.shields.io/chrome-web-store/v/jcfidgjldodhkpiebmemhnhgpgdakham?color=%234285F4&logo=googlechrome&logoColor=%234285F4&style=for-the-badge"></a>
  </p>
  <p align="center">
    🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.
  </p>
</p>

## Concepts

This web app is built on top of [metafy](https://github.com/xiaoluoboding/metafy), which provides serverless api to fetch websites metadata easily and turn the metadata into the visual bookmark. like Twitter does.

## Articles

* [《How to create a visual web bookmark?》](https://www.xlbd.me/posts/2021-08-16-how-to-create-a-visual-web-bookmark.html)

## Features

* 🔮 Turn any given links into a stylish visual web bookmark
* 🐦 Twitter card like
* 🔖 Notion web-bookmark like
* 🖼️ Copy image to your clipboard
* 💾 Download image to your computer.
* 📷 Toggle the QRCode on the bookmark
* 🌛 Dark mode support

## Chrome web extension for bookmark.style

[Go to chrome web store](https://chrome.google.com/webstore/detail/web-visual-bookmark/jcfidgjldodhkpiebmemhnhgpgdakham/)

## Usage Tips

You can create a new bookmarklet in your browser and enter the URL below:

```js
javascript:window.location="https://www.bookmark.style/?url="+encodeURIComponent(document.location)
```

When you click on the bookmarklet, it will redirect the page you're on to the [https://bookmark.style](bookmark.style).

[https://bookmark.style](bookmark.style) will auto-parse the URL and render the visual bookmark.

## Setup

### Install

Install the dependencies

```bash
yarn
# or
pnpm i
```

### Development

Run the development server

```bash
yarn dev
# or
pnpm dev
```

### Production

Build the extension

```bash
yarn build
# or
pnpm build
```

## Template

[This repo is created from this template on GitHub](https://github.com/xiaoluoboding/nuxt3-starter/generate).

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
