let arrayOfOrder = [] ;
localStorage.getItem('Done-Orders') ? arrayOfOrder = JSON.parse(localStorage.getItem('Done-Orders')) : '' ;

let checkLoedElemnts = setInterval(() => {
    let Status = window.localStorage.getItem('Status-Data') ;

    if (Status == 200) {
        
        toggleTopSid() ;
        doneOrder() ;
        removeDoneOrders(arrayOfOrder) ;
        clearInterval(checkLoedElemnts) ;
    };
}, 100);





// Functions Control Page


// Setting Of Top Sid
function toggleTopSid () {

    let divOrderCount = document.querySelector('.order-count');
    let showOrdersAside = document.querySelector('.orders');
    
    divOrderCount.addEventListener('click', () => {
        showOrdersAside.classList.toggle('close');
    });
};


function doneOrder () {

    let buttonsOrder = document.querySelectorAll('.status-button') ;
    
    buttonsOrder.forEach((el) => {
        el.addEventListener('click', () => {
            addOrderFromArray(el.getAttribute('order-code')) ;
            removeDoneOrders(arrayOfOrder) ;
        }) ;
    });
} ;


function addOrderFromArray(orderCode) {
    let order = {
        code: orderCode,
        time: new Date().getTime(),
    } ;
    arrayOfOrder.push(order) ;
    addDoneOrdersFromLocal(arrayOfOrder) ;
}

function addDoneOrdersFromLocal(Araay) {
    window.localStorage.setItem('Done-Orders', JSON.stringify(Araay))
}

function removeDoneOrders (arrayOfOrder) {
    let orders = document.querySelectorAll('.start-order') ;
    
    orders.forEach((e) => {

        arrayOfOrder.forEach((el) => {
            if (el.code === e.getAttribute('data-code')) {
                e.classList.add('done') ;
                setTimeout(() => {
                    e.classList.add('done-remove') ;
                }, 600);
            }
        })
    })
    
} ;