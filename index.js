var rootURL = "https://api.github.com"; //hardcoding this in some places since their tests don't seem to access this global variable

function displayError() {
  var errorMessage = "<p>I'm sorry, there's been an error. Please try again.</p>";
  $('#errors').html(errorMessage);
}

function searchRepositories() {
  var searchTerms = document.getElementById('searchTerms').value.split(' ').join('_');
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    var repositoriesTemplate = Handlebars.compile($('#repositories-template').html());
    $('#results').html(repositoriesTemplate(data))
  }).fail(displayError);
}

function showCommits(repo) {
  var owner = repo.dataset.owner;
  var repository = repo.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, commits => {
    var commitsTemplate = Handlebars.compile($('#commits-template').html());
    $('#details').html(commitsTemplate(commits))
  }).fail(displayError);
}

function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});
