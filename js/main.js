// Импортируем другие js-файлы
const contextMenuContents = {
    messages: [{name: 'Копировать', className: 'copy-button', link: '#'}, {
        name: 'Пожаловаться',
        className: '',
        link: '#'
    }],
    messagesSelf: [{name: 'Копировать', className: 'copy-button', link: '#'}],
    settings: [{name: 'Пожаловаться', className: '', link: '#'}],
};
const changeAccentBg = (color = 'default') => {
    $('.accent-bg').removeClass('accent-bg_xxx');
    $('.accent-bg').addClass(`accent-bg_${color}`)
}
const startChat = () => {
    $('.chat-block').addClass('show');
    $('.welcome-block').removeClass('show');
}

const changeTheme = function (item, theme = 'default') {
    $(item).closest('.theme-choose').find('.theme-choose-btn').addClass('button_non-active');
    $(item).removeClass('button_non-active');
};

const changeChatState = function () {
    $('.chat-start-btn').hasClass('show') ? ($('.chat-start-btn').removeClass('show'), $('.chat-end-btn').addClass('show')) : ($('.chat-start-btn').addClass('show'), $('.chat-end-btn').removeClass('show'));
};

const createContentMenu = (contextObject) => {
    const contextListItem = document.createElement('li'),
        contextListItemContent = document.createElement('a');
    contextListItem.classList.add('context-menu__item');
    contextObject.className !== '' ? contextListItem.classList.add(contextObject.className) : null;

    contextListItemContent.innerHTML = contextObject.name;

    contextListItemContent.setAttribute('href', contextObject.link);
    contextListItem.append(contextListItemContent);

    return contextListItem;
};

const closeShowContext = (block) => {
    $('.context-menu .context-menu__item').remove();

    Object.keys(contextMenuContents).forEach(function (key, value) {
        key == $(block).data('context') ? contextMenuContents[key].forEach(el => {
            $('.context-menu__list').append(createContentMenu(el))
        }) : null;
    });

    $('.context-menu').css({
        'top': `${block.offset().top + $(block).outerHeight() + 2}px`,
        'left': `${$(block).offset().left + $('.context-box__wrapper').outerWidth() > $('.chat-box__wrapper').outerWidth() ? $(block).offset().left - $('.context-menu').outerWidth() : $(block).offset().left}px`
    }).addClass('show');
};

const copyFunc = (copyText) => {
    const $temp = $("<input class='copy-text-wrapper' type='hidden'>");
    $("body").append($temp);
    let htmlToCopy = $(copyText).html();
    //let textToCopy = $.trim($(copyText).text());
    let regex = /<img\s+(?=(?:[^>]*?\s)?class="[^">]*emojione)(?:[^>]*?\s)?alt="([^"]*)"[^>]*>(?:[^<]*<\/img>)?/gi;
    let subst = `$1`;
    let unicodeToCopy = htmlToCopy.replace(regex, subst);
    $temp.val($.trim(unicodeToCopy));
}

$(document).ready(function () {
    $('body').on('contextmenu', '.message-block', function(e){ return false; });
    $('body').on('contextmenu','.message-block',function (e){
        closeShowContext($(this).find('.context-menu-link'));
    })
    $('body').on('mousedown','.context-menu-link-default',function (e){
        e.button === 0 ? closeShowContext($(e.target)) : null;
    })
    $(document).mouseup(function (e) {
        if (!$('.context-menu').is(e.target) && !$('.context-menu-link').is(e.target) && $('.context-menu-link').has(e.target).length === 0){
            $('.context-menu').removeClass('show');
        }
    });

    $('body').on('click','.copy-button',(e)=>{
        e.preventDefault();
        navigator.clipboard.writeText($('.copy-text-wrapper').val());
        $(".copy-text-wrapper").remove();
    });

    $('body').on('contextmenu','.copy-wrapper',function (e){
        e.preventDefault();
        copyFunc($(this));
    });

    $('.welcome-block').addClass('show');
    $('.chat-block').removeClass('show');

    $('.theme-choose-btn').click(function (e) {
        e.preventDefault();
        changeTheme(this, $(this).data('theme'));
    });
// слушаем событие resize
    window.addEventListener('resize', () => {
// получаем текущее значение высоты
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    $('.btn').click(function () {
        $(this).addClass('active');
        setTimeout(function () {
            $(this).removeClass('active');
        }.bind(this), 2000);
    });
    $("#text").emojioneArea(
        {
            saveEmojisAs: 'unicode'
        }
    );
    $('.emojionearea-editor div').remove();
    $('.emojionearea-editor').click(function () {
        $('.message-block').removeClass('unread');
    });
    $("body").on('DOMSubtreeModified', ".emojionearea-editor", function () {
        scrollToBottom();
    });
    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() <= 768) {
            $('.emojionearea-editor').attr({"autocomplete": "on", "autocorrect": "on", "autocapitalize": "sentences"});
        } else {
            $('.emojionearea-editor').attr({"autocomplete": "off", "autocorrect": "off", "autocapitalize": "false"});
        }
    });
});
$('.change-background__button').click(function () {
    $(this).siblings('.background-list').toggle(500);
});
$('.background-list__link').click(function (event) {
    event.preventDefault;
    const containerBckg = $('#chat-box__content');
    if ($(this).hasClass('no-bckg')) {
        containerBckg.css('background', '#f8f8f8');
    } else {
        const img_path = $(this).find('.background-list__img').attr('src');
        containerBckg.css('background', 'url(' + img_path + ')');
    }
});

function scrollToBottom() {
    var div = $("#chat-box__content");
    div.scrollTop(div.prop('scrollHeight'));
}

function initElement() {
    const close = document.getElementById('close');
    const send = document.getElementById('send');
    close.onclick = clearText;
}

function clearText(event) {
    const container = document.querySelector('.emojionearea-editor');
    const clearValue = container.innerHTML = "";
}

function clearChat(event) {
    const container = document.getElementById('chat-box__content');
    container.innerHTML = "";
}

function createMessage(text) {
    //const textContent = document.querySelector('.emojionearea-editor').innerHTML;
    const textContent = $("#text")[0].emojioneArea.getText();
    printMessage(textContent, 'self');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function printMessage(text, type, idmes) {
    idmes = getRandomInt(100, 999999);
    text = emojione.toImage(text);
    if (type == 'self') {
        if (text != "") {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const container = document.createElement('div');
            container.innerHTML = '<div id="' + idmes + '" class="message-block self"> \
    <div class="message-block__icon"></div> \
    <div class="message-block__text context-menu-link copy-wrapper" data-context="messagesSelf">' + text + '</div> \
    <div class="message-block__time">' + hours + ':' + minutes + '</div> \ \
</div>';
            document.getElementById('chat-box__content').append(container.firstChild);
            clearText();
            scrollToBottom();
            $('.emojionearea-button').removeClass('active');
        }
    }
    if (type == 'someone') {
        if (text != "") {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const container = document.createElement('div');
            container.innerHTML = '<div id="' + idmes + '" class="message-block someone"> \
    <div class="message-block__icon"></div> \
    <div class="message-block__text context-menu-link copy-wrapper" data-context="messages">' + text + '</div> \
    <div class="message-block__time">' + hours + ':' + minutes + '</div> \ \
</div>';
            document.getElementById('chat-box__content').append(container.firstChild);
            clearText();
            scrollToBottom();
            $('.emojionearea-button').removeClass('active');
        }
    }

}

function printSystem(text, isLoader) {
    const container = document.createElement('div');
    if (isLoader == false) {
        container.innerHTML = '<div class="message-block system"> \
    <div class="message-block__text">' + text + '</div> \
</div>';
    } else {
        container.innerHTML = '<div class="message-block system"> \
    <div class="message-block__icon"> <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></div> \
    <div class="message-block__text">' + text + '</div> \
</div>';
    }
    document.getElementById('chat-box__content').append(container.firstChild);
    clearText();
    scrollToBottom();
    $('.emojionearea-button').removeClass('active');
}

document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        $('.emojionearea-editor div').remove();
        const textOfInput = document.querySelector(".emojionearea-editor").textContent;
        const ImageContent = $('.emojionearea-editor').find('img');
        if (!(textOfInput == "") || !(ImageContent.length == 0)) {
            createMessage();
        }
    }
});
/* SCROLL BAR SETTINGS */
$(document).ready(function () {
    $('#chat-box__content').niceScroll(
        {
            cursorcolor: '#808080',
            scrollspeed: '150',
        }
    );
});