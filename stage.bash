logfile=${0}.log
artifact=dist/app.zip
tmpfolder=/tmp
remote_destination=bfjourna@bfjournal.com

red=$(tput setaf 1);
green=$(tput setaf 2);
reset=$(tput sgr0);

red=$(tput setaf 1);
green=$(tput setaf 2);
bold=$(tput bold);
reset=$(tput sgr0);

function echoerr() {
	cat <<< "$@" 1>&2;
}

function green() {
        echo "${green}${@}${reset}";
}

function red() {
        echo "${red}${@}${reset}";
}

function step() {
        printf "${1}: ";
        echo "${bold}Command:${reset} ${@:2}" >> $logfile
        if "${@:2}" >> $logfile 2>&1; then
                green "OK";
        else
                red "FAILED";
                echo "Printing last few lines of ${logfile}:"
                echo
                tail $logfile | sed 's=^=    =g'
                echo
                echo "See ${logfile} for full execution output"
                exit 1;
        fi
}

echo "Begin staging" > ${logfile}

step "On master branch" eval 'test "master" = "$(git rev-parse --abbrev-ref HEAD)"'
step "Uncommitted files" eval 'test -z "$(git status --porcelain)"'
step "Up-to-date" eval 'test -z "$(git fetch origin; git log HEAD..origin/master --oneline)"'
step "Pushes pending" eval 'test -z "$(git rev-list -n 1 HEAD@{upstream}..HEAD)"'
step "Build artifact" grunt default package

githash=$(git rev-parse HEAD)
tagged_artifact=${tmpfolder}/${githash}.zip
tagged_artifact_basename=$(basename "$tagged_artifact" .zip)

step "Tag artifact" cp $artifact $tagged_artifact
step "Upload" scp $tagged_artifact ${remote_destination}:
step "Stage" ssh ${remote_destination} "source ~/.bash_profile; stage ${tagged_artifact_basename}"
