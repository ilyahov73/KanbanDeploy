#!/bin/sh

set -e

if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi
bundle exec rails generate model user email:string name:string surname:string credit_card_num:string role:string
bundle exec rails generate model post title:string body:string user:references
bundle exec rails s -b 0.0.0.0