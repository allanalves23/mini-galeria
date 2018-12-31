import $ from 'jquery'

const callbacksHtmlCompleted = []

export function onLoadHtmlSuccess(c) {
    if(!callbacksHtmlCompleted.includes(c)){
        callbacksHtmlCompleted.push(c)
    }
}

function load(parent){
    if(!parent) parent='body'
    $(parent).find('[attr-add]').each((i, e) =>{
        const url = $(e).attr('attr-add')

        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('attr-add')
                callbacksHtmlCompleted.forEach(callback => callback(data))
                load(e)
            }
        })
    })
}

load()