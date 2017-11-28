var blogConverter = new showdown.Converter();

function getMarkdownFile(post, cb){
    $.ajax({
      url: "assets/posts/" + post,
      context: document.body,
      success: function(mdText){
        //where text will be the text returned by the ajax call
        var converter = new showdown.Converter();
        var htmlText = converter.makeHtml(mdText);
        cb(htmlText);
      }
    });
}

// get all the markdown files (and sort by pubdate?)
var posts = [];
$.get("assets/posts/", function(data) {
    $(data).find("a:contains(md)").each(function() {
        var a = ($(this).text());
        posts.push(a);
    });

    posts.forEach(function(post){
        getMarkdownFile(post, function(markdown) {
            // append to page
            var newPost = $('article');
            newPost.html(markdown);
            $('#posts').append(newPost);
        });
    });

});

