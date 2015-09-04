artifact=dist/app.zip
tmpfolder=/tmp
remote_destination=bfjourna@bfjournal.com

red=$(tput setaf 1);
green=$(tput setaf 2);
reset=$(tput sgr0);

function green() {
	echo "${green}${@}${reset}";
}

function red() {
	echo "${red}${@}${reset}";
}

function step() {
	printf "${1}: ";
	echo "${@:2}" >> stage.log
	if "${@:2}" 2>&1 >> stage.log; then
		green "OK";
	else
		red "FAILED";
		exit 1;
	fi
}

echo "Begin staging" > stage.log

step "On master branch" test "master" = "$(git rev-parse --abbrev-ref HEAD)"
step "Uncommitted files" test -z "$(git status --porcelain)"
step "Up-to-date" test -z "$(git fetch origin; git log HEAD..origin/master --oneline)"
step "Pushes pending" test -z "$(git rev-list -n 1 HEAD@{upstream}..HEAD)"
step "Build artifact" grunt default package

githash=$(git rev-parse HEAD)
tagged_artifact=${tmpfolder}/${githash}.zip
tagged_artifact_basename=$(basename "$tagged_artifact")

step "Tag artifact" cp $artifact $tagged_artifact
step "Upload" scp $tagged_artifact ${remote_destination}:
#step "Stage" ssh ${remote_destination} "source ~/.bash_profile; deploy.sh ${tagged_artifact_basename}"
