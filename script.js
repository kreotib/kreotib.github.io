let ImagesFiles = [];

const imagesFileSizeValidate = (file) =>{
    return file.size >= 5000;
};

const createNewFilesInfo = (fileName, status) =>{
    const newDiv = $(document.createElement('div'));
    $(newDiv).addClass(`images-form__file ${status}`).html(fileName);
    console.log(fileName);
    return $(newDiv);
};

$(".images-form__upload").bind('dragover drop', function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (event.type === 'drop') {
        const newFilesArray = event.originalEvent.dataTransfer.files,
            imageFormInfo = $('.images-form__info');
        ImagesFiles.push(event.originalEvent.dataTransfer.files);
        $(newFilesArray).map((index,el)=>{
            imagesFileSizeValidate(el) ? $(imageFormInfo).append(createNewFilesInfo(el.name, 'error')) : $(imageFormInfo).append(createNewFilesInfo(el.name, 'success'));
        });
    }
});

$(".images-form__input").bind('change', function(event) {
    const newFilesArray = event.target.files;
    ImagesFiles.push(event.target.files);
    $(newFilesArray).map((index,el)=>{
        console.log(el.name);
    });
});

$("#upload-button").bind('click', function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (ImagesFiles.length == 0) {
        // Handle what you want to happen if no files were in the "queue" on clicking upload
        return;
    }

    var formData = new FormData();
    $.each(ImagesFiles, function(key, value) {
        formData.append(key, value);
    });

    $.ajax({
        url: 'upload-ajax',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files - I actually got this and the next from an SO post but I don't remember where
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) { /* Handle success */ },
        error: function(jqXHR, textStatus, errorThrown) { /* Handle error */ }
    });

});