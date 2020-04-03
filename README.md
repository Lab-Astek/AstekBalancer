# AstekBalancer

## Description

AstekBalancer is a Chrome extension that lets Asteks easily pick non-overlapping
appointment slots.

## Installation

1. Clone the repository.
1. Navigate to `chrome://extensions/`.
1. Turn on *Developer mode*.
1. Click the "*Load Unpacked*" button.
1. Select the directory you just cloned the repository into.

## Usage

1. Get a list of all groups of Asteks available for corrections on an activity.
1. Navigate to the activity's `/rdv/` page on the intranet.
1. Click on the extension's icon, enter the group names separated by a new line.
Note that you may filter groups to only display a certain period of time or
specify an offset (typically corresponding to the id of the last group in the
previous timestamp)
1. Hit "*Show*". You may also click the "*Save*" button to download a dump of
each group's assignments as a separate `.txt` file.
