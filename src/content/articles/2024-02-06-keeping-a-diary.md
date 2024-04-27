---
title: Keeping a diary
slug: diary
date: 2024-03-12
created: 2024-02-06
revision: 3
status: 1
tags:
- this website
- content strategy
summary: Maintaining an online diary, sharing photos of my kids and security concerns.
---
I keep a diary—well, a diary _of sorts_. It's more of a photo journal. It has a tiny set of users: my wife Katie and me, our respective parents, and a small group of close friends. Until February 2024, my diary was published here with the naive assumption that it would be accessed only by its intended audience; I thought I'd enjoy _security through obscurity_. 

But, as my kids get older, they won't thank me for having thousands of photos of them freely available online. Our surname is unique enough that, even though I've never used their full names here, a cursory search for "roobottom" returns hundreds of images.

I'd never forgive myself if they were the victims of grooming, identity fraud or any of the other horrible things that people can do with photos that contain identifiable information. Search *"Why shouldn't I publish photos of my kids online?"* and you'll quickly discover why I started to worry.

## Rethinking my content strategy

My thinking on content strategy is shifting. The changes I'm making to my diary are interconnected with the [Digital Garden](https://maggieappleton.com/garden-history). Diary posts and long-form articles have always been fundamentally different at their core, but the concept of "curating content over time" shifts them even further apart.

I took this opportunity to move some family-orientated, time-based articles into the diary. My "reviews of the year" are one example of things that have disappeared from articles.

Predictably, some articles don't fit neatly into either section. [Bikepacking in the New Forest](/articles/bikepacking-in-the-new-forest/) is time-based and personal, but it feels interesting enough for others to live in the public part of my site.

*All this is flawed; it's always a work in progress.*

## I moved my diary behind a login screen.

A login screen now hides Diary posts from the wider world. This was a significant technical challenge, given my design constraints:

* I wanted to be independent of any one hosting provider. Netlify offers many ways to secure a website, but they're all vendor-specific.
* I want to make it as simple as possible for my parents by only asking for a password.
* I wanted to be able to design my own login screen.

<figure url='/images/articles/diary/diary-login.png' caption='A screenshot showing my diary login page: The diary can be accessed with a password, making it easy for people in the know to access without also having to remember a username' classes='shadow'>

I wrapped my Eleventy-generated content in a simple Express-js server to achieve independence. This way, I can serve mainly static content while maintaining server-side control over routes when needed.

## Secure images with ImageKit

I use [ImageKit](https://imagekit.io/) to host my images. It costs me nothing, as I use less than the 20GB of bandwidth and storage they offer for free. 

Using ImageKit enables me to host my images securely as they support [signed URLs](https://docs.imagekit.io/features/security/signed-urls#generating-signed-urls-on-your-own). I have configured this so that I can sign each image request via Express. The image URL is then valid for 30 seconds, which means it shows up for authorised users but can't be copied and used later as the signing key is bound to the timestamp.

Signed URLs also have the advantage that the hi-res versions of images cached by Google (and others) no longer work. Over time, even those cached versions should die out.

Another feature ImageKit unlocks is *image manipulation*. I use this feature to build a collage for each diary post with up to four images, which I can then show on the diary listing page using my `card` component.

<figure url='/images/articles/diary/collages.png' caption='Four card components showing how I use generative image collages to tease post content.' classes='wide' transform='wide'>

