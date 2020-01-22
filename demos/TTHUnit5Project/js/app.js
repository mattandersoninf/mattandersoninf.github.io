// app.js

$(document).ready(function(){
    // grab the information from of the search input
    $("#search").on("keyup", function(){
        // grab the text that the user has typed
        //use toLowerCase so that it will still return the correct result if the user uses upper case
        let searchable = $(this).val().toLowerCase();
        /* 
        Toggle the visibility of the figures that have the photo-container class.
        If the searchable text matches part of the text within the figure, it will be visible, you won't see it otherwise.
        */
        $(".gallery .photo-container").filter(function(){
            $(this).toggle($(this).find('a').attr('title').toLowerCase().indexOf(searchable) > -1)
        });
    });
});