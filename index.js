function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

var rootURL = "https://api.github.com"; //hardcoding this in since their tests don't seem to access this global variable

function searchRepositories() {
  var searchTerms = document.getElementById('searchTerms').value.split(' ').join('_');
  var uri = "https://api.github.com" + "/search/repositories?q=" + searchTerms;
  $.get(uri, function(data){
    var repositoriesTemplate = Handlebars.compile(document.getElementById('repositories-template').innerHTML);
    var repoList = repositoriesTemplate(data);
    document.getElementById('results').innerHTML = repoList;
  }).fail(displayError);
}

function displayError() {
  var errorMessage = "<p>I'm sorry, there's been an error. Please try again.</p>";
  document.getElementById('errors').innerHTML = errorMessage;
}

function showCommits(repo) {
  var owner = repo.dataset.owner;
  var repo = repo.dataset.repo;
  var uri = "https://api.github.com" + `/repos/${owner}/${repo.dataset.repo}/commits`;
  $.get(uri, function(commits){
    var commitsTemplate = Handlebars.compile(document.getElementById('commits-template').innerHTML);
    var commitsList = commitsTemplate(commits);
    document.getElementById('details').innerHTML = commitsList;
  }).fail(displayError);
}
