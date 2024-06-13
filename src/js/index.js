"use strict"
let e = elem => document.querySelector(elem);
let mobile_menu = e('.mobile-menu');
e('.gamburger-menu').addEventListener('click', closeMenu);
function closeMenu(){
    e('.gamburger-menu .line:nth-child(1)').classList.toggle('active_catalog_one');
    e('.gamburger-menu .line:nth-child(2)').classList.toggle('active_catalog_two');
    e('.gamburger-menu .line:nth-child(3)').classList.toggle('active_catalog_three');
    if (mobile_menu.classList.contains('off')){
        console.log('off');
        mobile_menu.classList.toggle('off');
        let idtimer = setTimeout(()=>{
            mobile_menu.classList.toggle('mobile-menu-on');
        }, 1);
        
    } else{
        console.log('noff');
        mobile_menu.classList.toggle('mobile-menu-on');
        let idtimer = setTimeout(()=>{
            mobile_menu.classList.toggle('off');
        }, 500);   
    }
}
let main=document.querySelector('main');
let main_container=document.querySelector('.main-container');
let add_recipe_block=document.querySelector('.add-recipe-block');


Start();
window.addEventListener('resize', Start);
function Start(){
    main.style.flex = '1 0 '+ (Number(add_recipe_block.offsetHeight) + 200) + 'px';
}

/*slider*/
/*стрелочки*/
let arrow_right = e('.first-block .right-arrow');
let arrow_left = e('.first-block .left-arrow');
arrow_right.addEventListener('click', ()=>{
    let select_picture = e('.first-block .slider-row .select-picture');
    let next_picture = select_picture.nextElementSibling;

    let down_select_picture = e('.first-block .slider-down .select-picture');
    let down_next_picture = down_select_picture.nextElementSibling;

    if (next_picture){
        arrow_right.classList.remove('off');
        arrow_left.classList.remove('off');
        next_picture.style.left = '0%';
        select_picture.classList.remove('select-picture');
        next_picture.classList.add('select-picture');
        
        down_select_picture.classList.remove('select-picture');
        down_next_picture.classList.add('select-picture');
    }
    /*проставляем стрелочки*/
    select_picture = e('.first-block .slider-row .select-picture');
    next_picture = select_picture.nextElementSibling;
    if (!next_picture){
        arrow_right.classList.add('off');
    }
});
arrow_left.addEventListener('click', ()=>{
    let select_picture = e('.first-block .slider-row .select-picture');
    let prev_picture = select_picture.previousElementSibling;

    let down_select_picture = e('.first-block .slider-down .select-picture');
    let down_prev_picture = down_select_picture.previousElementSibling;

    if (prev_picture){
        arrow_left.classList.remove('off');
        arrow_right.classList.remove('off');
        select_picture.style.left = '100%';
        select_picture.classList.remove('select-picture');
        prev_picture.classList.add('select-picture');

        down_select_picture.classList.remove('select-picture');
        down_prev_picture.classList.add('select-picture');
    } 
    /*проставляем стрелочки*/
    select_picture = e('.first-block .slider-row .select-picture');
    prev_picture = select_picture.previousElementSibling;
    if (!prev_picture){
        arrow_left.classList.add('off');
    }
});

/*картинки снизу*/
let down_pituries = document.querySelectorAll('.first-block .slider-picture');
down_pituries.forEach((down_picture, index)=>{
    down_picture.addEventListener('click', ()=>{
        let select_down_picture = e('.first-block .slider-down .select-picture');
        select_down_picture.classList.remove('select-picture');
        down_picture.classList.add('select-picture');
        let select_picture = e('.first-block .slider-row .select-picture');
        select_picture.classList.remove('select-picture');
        let selecter_for_new_picture = `.first-block .slider-row .slider-item:nth-child(${index+1})`; //
        let new_select_picture = e(selecter_for_new_picture);
        new_select_picture.classList.add('select-picture');
        let items = document.querySelectorAll('.first-block .slider-row .slider-item');
        items.forEach((item, i)=>{
            if (i == 0){
                item.style.left = '0%';
            } else if (i<=index){
                item.style.left = '0%';
            } else if (i>index){
                item.style.left = '100%';
            }
        })

        let next_picture = new_select_picture.nextElementSibling;
        if (!next_picture){
            arrow_right.classList.add('off');
            arrow_left.classList.remove('off');
        }
        let prev_picture = new_select_picture.previousElementSibling;
        if (!prev_picture){
            arrow_left.classList.add('off');
            arrow_right.classList.remove('off');
        }
        if (prev_picture && next_picture){
            arrow_left.classList.remove('off');
            arrow_right.classList.remove('off');
        }
        
    })
});
/*модальное окно с картинками*/

let modal_picture = e('.modal-picture');
let cross_modal_picture = e('.modal-picture .cross');
cross_modal_picture.addEventListener('click', ()=>{
    modal_picture.classList.add('off');
    e('body').style.overflow = 'visible';
})
let picture_in_modal = e('.modal-picture .picture');
let picturies = document.querySelectorAll('.first-block .slider-row .slider-item');
picturies.forEach((pic)=>{
    pic.addEventListener('click', ()=>{
        modal_picture.classList.remove('off');
        const style = window.getComputedStyle(pic, false)
        let new_pic = style.backgroundImage;
        picture_in_modal.style.backgroundImage = new_pic;
        console.log(new_pic);
        e('body').style.overflow = 'hidden';
    })
})

/*слайдер с похожими рецептами*/
let similar_recipes = document.querySelectorAll('.similar-recipes .card');
let arr = [];

let arrow_left_similar = e('.similar-recipes .left-arrow');
let arrow_right_similar = e('.similar-recipes .right-arrow');

arrow_right_similar.addEventListener('click', ()=>{
    similar_recipes.forEach((sim_rec)=>{
        arr.push(sim_rec.innerHTML);
    })
    similar_recipes.forEach((sim_rec, index)=>{
        if (index+1 < similar_recipes.length){
            sim_rec.innerHTML = arr[index+1];
        } else if (index+1 == similar_recipes.length){
            sim_rec.innerHTML = arr[0];
        }
    })
    arr = [];
})
arrow_left_similar.addEventListener('click', ()=>{
    similar_recipes.forEach((sim_rec)=>{
        arr.push(sim_rec.innerHTML);
    })
    similar_recipes.forEach((sim_rec, index)=>{
        if (index == 0){
            sim_rec.innerHTML = arr[similar_recipes.length-1];
        } else if (index > 0){
            sim_rec.innerHTML = arr[index-1];
        }
    })
    arr = [];
})





/*modal window add recipe*/
let add_direct_line_first = e('.add-direct-line-first textarea');
let direct_lines = document.querySelectorAll('.add-direct .add-direct-line');
let ingred_lines = document.querySelectorAll('.add-ingred .ingred-line');

let add_recipe_container = e('.add-recipe-container');
let add_recipe_button = e('header .submit_button');
let add_recipe_button_mobile = e('header .mobile-menu .submit_button');
add_recipe_button_mobile.addEventListener('click', ()=>{
    add_recipe_container.classList.remove('off');
    closeMenu();
});
add_recipe_button.addEventListener('click', ()=>{
    add_recipe_container.classList.remove('off');
    Start();
})
add_recipe_container.addEventListener('click', (event)=>{
    if (event.target == add_recipe_container){
        add_recipe_container.classList.add('off');
        Start();
    }
})


let add_ingred = e('.add-ingred');
let add_ingred_button = e('.add-ingred-btn');
add_ingred_button.addEventListener('click', ()=>{
    let ingred_line = e('.ingred-line div:nth-child(2)');
    if (!e('.ingred-line div:nth-child(2) svg')){
        ingred_line.innerHTML = `<input type="text" name="name_ingred" placeholder="Milk" value="${ingred_line.querySelector('input').value}"><svg><use xlink:href="/src/images/svg/sprite.svg#cross"></use></svg>`;
    };
    let minus_ingred_first = ingred_line.querySelector('svg');
    minus_ingred_first.addEventListener('click', delete_ingred);
    let new_div = document.createElement('div');
    new_div.classList.add('ingred-line');
    new_div.innerHTML = '<div><input type="text" name="count_ingred" placeholder="1 Cup"></div><div><input type="text" name="name_ingred" placeholder="Milk"><svg><use xlink:href="/src/images/svg/sprite.svg#cross"></use></svg></div>';
    let minus_ingred = new_div.querySelector('svg');
    minus_ingred.addEventListener('click', delete_ingred);
    add_ingred.insertBefore(new_div, add_ingred_button);

    function delete_ingred(event){
        event.target.closest('.ingred-line').remove();
        let lines = document.querySelectorAll('.ingred-line');
        if (lines.length == 1){
            e('.ingred-line div:nth-child(2) svg').remove();
        }
        
    }
})


let add_direct = e('.add-direct');
let plus_direcion = e('.add-direct-line-first svg');
plus_direcion.addEventListener('click', ()=>{
    if (add_direct_line_first.value){
        let new_div = document.createElement('div');
        new_div.classList.add('add-direct-line');
        new_div.innerHTML = '<textarea rows="3" type="text" name="direct_ingred" placeholder="Combine flour...">'+add_direct_line_first.value+'</textarea><svg><use xlink:href="/src/images/svg/sprite.svg#cross"></use></svg>';
        add_direct.append(new_div);
        let minus_direction = new_div.querySelector('svg');
        minus_direction.addEventListener('click', (event)=>{
            event.target.closest('.add-direct-line').remove();
        })
        Start();
    }
})

