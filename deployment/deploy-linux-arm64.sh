#!/bin/sh

# Deploys a published linux-arm64 build over ssh.
#
#
# Preconditions:
#
#   1.) Service "member-management" has to be configured.
#     Example file "/etc/systemd/system/member-management.service":
# [Unit]
# After=network.target
# [Service]
# ExecStart=/home/{username}/member-management/service/startMemberManagement.sh
# ExecStop=/home/{username}/member-management/service/stopMemberManagement.sh
# [Install]
# WantedBy=default.target
#
#   2.) User has the sudo rights to start the service
#       In an ubuntu environment, create a file here "/etc/sudoers.d/{groupname}" and add the following lines:
# %{groupname} ALL= NOPASSWD: /bin/systemctl start member-management
# %{groupname} ALL= NOPASSWD: /bin/systemctl stop member-management

# Abort if environment variables not set
if [ -z "$DEPLOYMENT_USERNAME" ]; then
    echo "Environment variable DEPLOYMENT_USERNAME not set"
    exit
fi
if [ -z "$DEPLOYMENT_TARGET" ]; then
    echo "Environment variable DEPLOYMENT_TARGET not set"
    exit
fi

# Stop the member-management service
ssh $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET 'sudo systemctl stop member-management'

# Clear target folder
ssh $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET 'rm -r -f /home/'$DEPLOYMENT_USERNAME'/member-management/bin'
ssh $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET 'mkdir /home/'$DEPLOYMENT_USERNAME'/member-management/bin'

# Copy data
scp -r ../src/MemberManagement/Server/bin/Release/net7.0/linux-arm64/publish/* $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET:/home/$DEPLOYMENT_USERNAME/member-management/bin/

# Configure executable
ssh $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET 'chmod a+x /home/'$DEPLOYMENT_USERNAME'/member-management/bin/MemberManagement.Server'

# Start the member-management service
ssh $DEPLOYMENT_USERNAME@$DEPLOYMENT_TARGET 'sudo systemctl start member-management'
