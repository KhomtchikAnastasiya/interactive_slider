"use strict"

let countryHJ=["RU","BY","KZ","TR"];

let countryH=JSON.parse(JSON.stringify(countryHJ));

let combinationH=[]; // создаем пустой массив, в который будем складывать массивы с необходимыми комбинациями

let memory=[]; // пустой массив, в котором будут сохраняться уже использованные значения стран

function getCombinations(arr) { // функция составляет необходимые комбинации стран

    for (let i=0; i<arr.length; i++) {

        memory.push(arr[i]);
        let a=i+1;

        for (a; a<arr.length; a++) {
            if (arr[a] in memory) 
            continue;
            combinationH.push([arr[i], arr[a]]);
        }

    }
}

getCombinations(countryH);

const slider=document.getElementById('sliderWrapper');
let flagElementImg;
 
function createSliderElement (arr) { // функция принимает аргументом массив с комбинацией и строит по нему слайд

    let sliderElement=document.createElement("a"); // создаем необходумую структуру слайдера
    sliderElement.className='slider__element';
    slider.appendChild(sliderElement);

    let spanElement=document.createElement("span");
    spanElement.innerHTML="Между ";
    sliderElement.appendChild(spanElement);

    let href="test.com?arrival=ru&departure=tr";
    
    for (let n=0; n<arr.length; n++) { // проходимся по массиву с комбинацией, добавляем соответсвующие картинки и меняем адрес ссылки
        createFlagElement(arr[n]);
        sliderElement.appendChild(flagElementImg);
        if (n==0) {
            let spanElement=document.createElement("span");
            spanElement.innerHTML=" и ";
            sliderElement.appendChild(spanElement);
            href=href.split("ru").join(arr[n].toLowerCase()); //если это нулевой элемент массива, то меняем в ссылке место отправления
        }
        else href=href.split("tr").join(arr[n].toLowerCase()); //если это первый элемент массива, то меняем в ссылке место прибытия
        
    }

    sliderElement.setAttribute('href', href);

}

function createFlagElement (n) { // функция принимает аргументом код страны
    n=n.toUpperCase();
    let src="img/"+n+".png";
    flagElementImg=document.createElement("img");
    flagElementImg.className='slider__flag';
    flagElementImg.setAttribute('src', src);
    return flagElementImg; // возвращает готовый тег img  с атрибутом src
}


function createSlider(arr) {
    for (let i=0; i<arr.length; i++) {
        createSliderElement(arr[i])
    }
}

createSlider(combinationH);



$(document).ready(function(){ // настройки слайдера
    $('.slider__wrapper').slick({
        infinite: true, 
        slidesToShow: 5, 
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        arrows: false,
    });
});