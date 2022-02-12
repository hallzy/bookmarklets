# Bookmarklets

Just various bookmarklets I've made.

To use:

- Copy the contents of the bookmarklet file you want to use
- Create a new bookmark in your browser of Choice, and paste the code into the
  URL/location part of the bookmark

Set the bookmark to show on your bookmark bar for easier access

## Bookmarklet Descriptions

### open_pics_in_tabs.js

NOTE: You will probably have to disable blocking popups for the page you try to
do this on, otherwise this script may only open 1 image instead of all.

Attempts to find images on the current page, and opens them in a new tab.

The images it finds are either `<img>` tags for images bigger than 700x700, or
they are files in `<a>` tags that have an image extension (jpg, jpeg, png,
webp).

Doesn't always work for everything (cough Instagram cough), but is a decent
generic script that works in most cases.

See [instagram.js](#instagramjs) for a script that does work with instagram.

### open_vids_in_tabs.js

Attempts to find videos on the current page, and opens them in a new tab.

The images it finds are either the source of a `<video>` tag or the `source` tag
of a video tag.

It also tries to search for videos inside of iframes recursively for those
pesky websites that try to embed videos in layers upon layers of iframes so you
can't find them.

Again, doesn't always work for everything,  but is a decent generic script that
works in a lot of cases.

See [#instagram.js](#instagramjs) for a script that works for instagram.

### sort_youtube_plylist_by_duration.js

This is a crappy script to sort a playlist by duration (shortest to longest). It
works most of the time, with the odd time it seems to mess up.

It also only works if the entire playlist is loaded on the page. It doesn't use
an API, it literally just moves the items in the playlist like you would if you
were to do it manually. This just makes it faster.

I couldn't be bothered to use an actual sorting algorithm. One reason being that
it is probably (I didn't try) a pain to get javascript to actually drag the
items into the correct position, so it just clicks the "move to bottom" button
on all of the videos in the playlist, but it does it in order of duration.

### instagram_reduce_focus_of_videos.js

Lowers the opacity of tiles that are videos or clips to take focus away from
them.

### instagram.js

NOTE: You will probably have to disable blocking popups for the page you try to
do this on, otherwise this script may only open 1 image instead of all.

This does the same as [open_pics_in_tabs.js](#open_pics_in_tabsjs) and
[open_vids_in_tabs.js](#open_vids_in_tabsjs)
except it is meant of use on instagram, and works on stories, as well as
collections of multiple images and videos.

### picture_in_picture.js

Finds the first video on a page and requests picture in picture to get that
video out of the browser into it's own window
