import $ from 'jquery'
import {onLoadHtmlSuccess} from '../core/adds'

const duration = 450

function filterByCity(city){
    $('[city]').each(function (i,e){
        const isTarget = $(this).attr('city') === city || city === null
        if(isTarget){
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        }else{
            $(this).fadeOut(duration, ()=>{
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    
    const cities = new Set
    $('[city]').each(function(i, e){
        cities.add($(e).attr('city'))
    })

    
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn','btn-outline-dark','mr-1']).html(city)
        btn.click(e => filterByCity(city))
        return btn
    })
    
    const btnAll = $('<button>').addClass(['btn','btn-outline-dark']).html('Sem filtro')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)
    
    const filters = $('<div>').addClass('btn-group')
    filters.append(btns)
    
    $(this).html(filters)
    return this
}

onLoadHtmlSuccess(function(){
    $('[city-buttons]').cityButtons()
})