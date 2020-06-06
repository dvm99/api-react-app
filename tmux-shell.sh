#!/bin/bash

SESSION=$USER

tmux -2 new-session -d -s $SESSION -n 'api-comparison-app'

# Setup a window for tailing log files
tmux select-window -t 1
tmux split-window -h
tmux select-pane -t 2
tmux send-keys "cd RESTapi" C-m
tmux send-keys "npm run start" C-m
tmux split-window -v
tmux select-pane -t 3
tmux send-keys "cd GraphQLapi" C-m
tmux send-keys "npm run start" C-m
tmux select-pane -t 1
tmux send-keys "cd react-app" C-m
tmux send-keys "npm run start" C-m


sleep 1


# Set default window
tmux select-window -t $SESSION:1


# Attach to session
tmux -2 attach-session -t $SESSION
