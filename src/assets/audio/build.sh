#!/usr/bin/env bash

input_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# output_dir="${input_dir}/../../../static/audio"
output_dir=${input_dir}

shopt -s nullglob
for file in *.wav; do
    opusenc --bitrate 96 ${input_dir}/${file} "${output_dir}/${file%.*}.opus"
    ffmpeg -i ${input_dir}/${file} -codec:a libmp3lame -qscale:a 2 "${output_dir}/${file%.*}.mp3"
done
