var partySize = 0
var days = 0

var picker = new Lightpick({
    field: document.querySelector('#start-date'),
    singleDate: false,
    minDate: moment(),
    maxDate: moment().add(15,'day'),
    numberOfMonths: 2,
    onSelect: function(start, end){

        if(end != null){
            var iDays = end.diff(start,'days')
            document.querySelector('.trip-duration').innerHTML = (iDays +1)
            days = iDays + 1
        }
    }


})

function vehicleCalc(){
    console.log('hello')
    var bike = $('.option1')
    var carSmall = $('.option2')
    var carLarge = $('.option3')
    var motorHome = $('.option4')

    // calculate which vehicles are suitable

    if(days==0 || partySize==0){
        //todo: error message
        return
    }
    else{
        //bike
        if(days<5 && partySize < 2){
            bike.addClass('suitable')    
            console.log('bike') 
        }

        //small Car
        if(days<10 && partySize < 3){
            carSmall.addClass('suitable')
        }

        //large car
        if(days<10 && days>2 && partySize<5){
            carLarge.addClass('suitable')
        }

        //motorhome
        if(days<15 && days>1 && partySize<16 && partySize>2){
            motorHome.addClass('suitable')
        }
    }

    
    
}

function vehicleDisplay(list){
    console.log(list)
    //add class on suitable vehicles
    for(i=0; i>list.length; i++){
        console.log(list[i])
        $(list[i]).addClass('suitable')
    }

}


//Animation Scroll

$(function(){
    var anime1 = anime({
        targets:'.journey-planner',
        translateY: ['-100vh'],
        easing: 'easeInBack',
        duration: 500,
        autoplay: false
    })

    var anime2 = anime({
        targets:'.journey-planner',
        translateY: ['-200vh'],
        autoplay: false
    })

    var anime3= anime({
        targets:'.party-picker',
        rotate: '1turn',
        autoplay: false
    })



    $('.next-step-1').on('click', function(){
        var value = $('#partySize').val()
        if(value > 15){
            //freak out
            anime3.play()
            //display warning 
        }
        else{
            partySize = value
            anime1.play();
        }
    })

    $('.next-step-2').on('click', function(){
        anime2.play();
        vehicleCalc(partySize, days)
    })
})

$('.fa-minus-circle').on('click', function(){
    currentVal = $('#partySize').val()
    console.log(currentVal)
    newVal = currentVal--
    $('#partySize').val(currentVal)
})

$('.fa-plus-circle').on('click', function(){
    currentVal = $('#partySize').val()
    console.log(currentVal)
    newVal = currentVal++
    $('#partySize').val(currentVal)
})

$('.option').on('click', function(e){
    //add style
    console.log(this)

    $(this).addClass('selected')
})
