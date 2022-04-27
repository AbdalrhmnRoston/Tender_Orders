{
    {
      // Your API KEY
      const API_KEY = "AIzaSyAOoeivprNUlwwuJLRvUnu8qq3Jtw2OvZk";


      window.localStorage.setItem('Status-Data', 'Load') ;
      function displayResult2(response) {

        let values = response.result.values;
        // Array From All Orders
        let Orders = [];

        // Create Ojaect Order
        for (let i = 2; i < values.length; i++) {
          
          // Order From Loop
            let Order = {};

            Order.code = response.result.values[i][0];
            Order.name = response.result.values[i][2];
            Order.phone1 = response.result.values[i][3];
            Order.phone2 = response.result.values[i][4];
            Order.location = handellLocation(response.result.values[i][5]);
            Order.address = response.result.values[i][6];
            Order.price = response.result.values[i][7];
            Order.time = response.result.values[i][9];
            Order.note = response.result.values[i][10];
            Order.status = '';
            
          
            // Push Order On Array All Orders
            Orders.push(Order);
          }
        

          //  Run Function Top Side 
          createTopSid(Orders, values[0][2]);
          //  Run Function Create Orders
          createStartOrder(Orders); 
          

          
          window.localStorage.setItem('Status-Data', response.status) ;
      };



      function loadData() {
        // Spreadsheet ID
        const spreadsheetId = "1hU_eGQ8ChMQ8CkBcOIpNUbM2M0fOMPXWFVhC41FKUc0";
        // const range = "'Driver 1'!A:Z";

        // Daynamec Get Number Of Sheet
        if (window.location.href.includes('driver001') == true) {
          range = "'Driver 1'!A:Z";
        } else if (window.location.href.includes('driver002') == true) {
          range = "'Driver 2'!A:Z";
        } else if (window.location.href.includes('driver003') == true) {
          range = "'Driver 3'!A:Z";
        } else if (window.location.href.includes('driver004') == true) {
          range = "'Driver 4'!A:Z";
        }

        getPublicValues({ spreadsheetId, range }, displayResult2);
      }

      window.addEventListener("load", (e) => {
        initOAuthClient({ apiKey: API_KEY });
      });

      document.addEventListener("gapi-loaded", (e) => {
        loadData();
      });




let container = document.getElementById('main-container') ;
      
function createTopSid(Orders, driverName) {
    
  let aside = document.createElement('aside');
  // Get All Orders
  let orders = Orders;
  // Get Number Of Orders
  let ordersCount = Orders.length;
  
  
  aside.classList.add('top-aside');
  let sayHello = document.createElement('div');
  sayHello.classList.add('say-hello');
  sayHello.innerHTML = `مساء الخير يا ${driverName}`;
  
  aside.appendChild(sayHello)
  let orderCount = document.createElement('div');
  orderCount.classList.add('order-count');
  orderCount.innerHTML = `معاك النهاردة ${ordersCount} اوردر`
  
  aside.appendChild(orderCount);
  let divOrders = document.createElement('div');
  divOrders.classList.add('orders');
  divOrders.classList.add('close');
  
  aside.appendChild(divOrders);
  for (let i = 0; i < ordersCount; i++) {
      let divOrder = document.createElement('div');
      divOrder.classList.add('order');

      let orderName = document.createElement('div');
      orderName.innerHTML = orders[i].name;
      
      divOrder.appendChild(orderName);
      if (orders[i].note !== undefined) {
          let span = document.createElement('span');
          span.innerHTML = orders[i].note;

          // Append Order Note From Aside Bar 
          divOrder.appendChild(span);
      };

      divOrders.appendChild(divOrder);
  };
  
  aside.appendChild(divOrders);
  container.prepend(aside);

};

function createStartOrder(Orders) {
  let sectionOrders = document.createElement('div');
  sectionOrders.classList.add('section-orders');
  container.appendChild(sectionOrders);

  let ordersCount = Orders.length;
  
  for (i = 0; i < ordersCount; i++) {

  let orders = Orders;

  let divStartOrder = document.createElement('div');
  divStartOrder.classList.add('start-order');
  divStartOrder.setAttribute('data-code', orders[i].code);
  

  let divOrderNow = document.createElement('div');
  divOrderNow.classList.add('order-now');

  divStartOrder.appendChild(divOrderNow);

  let headOrder = document.createElement('h3');
  headOrder.innerHTML = `اوردر رقم ${i + 1}`;

  divOrderNow.appendChild(headOrder);
  let divOrderInfo = document.createElement('div');
  divOrderInfo.classList.add('order-info');

  let divOrderName = document.createElement('div');
  divOrderName.classList.add('name') ;
  divOrderName.innerHTML = `اسم العميل : ${orders[i].name}` ;

  divOrderInfo.appendChild(divOrderName);
  let divOrderTime = document.createElement('div');
  divOrderTime.classList.add('time');
  divOrderTime.innerHTML = `وقت التوصيل : ${orders[i].time}`;

  divOrderInfo.appendChild(divOrderTime);
  let divOrderPrice = document.createElement('div');
  divOrderPrice.classList.add('price');
  divOrderPrice.innerHTML = `الحساب : ${orders[i].price}`;

  divOrderInfo.appendChild(divOrderPrice);
  let divOrderPhone = document.createElement('div');
  divOrderPhone.classList.add('phone');

  if (orders[i].phone1.length > 5) {
      let linkOrderPhone1 = document.createElement('a');
      linkOrderPhone1.classList.add('button');
      linkOrderPhone1.href = `tel:${orders[i].phone1}`;
      linkOrderPhone1.innerHTML = `رقم الهاتف 1`;
      divOrderPhone.appendChild(linkOrderPhone1);
  }

  if (orders[i].phone2.length > 5) {
      let linkOrderPhone2 = document.createElement('a');
      linkOrderPhone2.classList.add('button');
      linkOrderPhone2.href = `tel:${orders[i].phone2}`;
      linkOrderPhone2.innerHTML = `رقم الهاتف 2`;
      divOrderPhone.appendChild(linkOrderPhone2);
  }

  divOrderInfo.appendChild(divOrderPhone);
  let linkOrderLocation = document.createElement('a');
  linkOrderLocation.href = orders[i].location;
  linkOrderLocation.target = '_blank'
  linkOrderLocation.classList.add('location');
  linkOrderLocation.classList.add('button');
  linkOrderLocation.innerHTML = `اللوكيشن`;

  divOrderInfo.appendChild(linkOrderLocation);
  let divOrderAddress = document.createElement('div');
  divOrderAddress.classList.add('address');
  divOrderAddress.innerHTML = orders[i].address;

  divOrderInfo.appendChild(divOrderAddress);

  if (orders[i].note !== undefined) {
      let divOrderNote = document.createElement('div');
      divOrderNote.classList.add('note');
      divOrderNote.innerHTML = orders[i].note;

      divOrderInfo.appendChild(divOrderNote);
  };

  let statusButton = document.createElement('button');
  statusButton.classList.add('button');
  statusButton.classList.add('status-button');
  statusButton.setAttribute(`order-code`, orders[i].code);
  statusButton.innerHTML = 'تم التوصيل';

  divOrderInfo.appendChild(statusButton);

  divOrderNow.appendChild(divOrderInfo);
  sectionOrders.appendChild(divStartOrder);
  };
};



  // Handell Link Locaion 
  function handellLocation (location) {
    if (location.length > 1) {
    let editLocation = location.split('');
    let localLink = 'https://maps.google.com/?q=';
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ','] ;
    let result = '';


    // Check If Can Location Numbers
    if (location.includes('(') || location.includes(')')) {
      editLocation.forEach(el => {
          for (let i = 0; i < numbers.length; i++) {
              if (el === numbers[i]) {
                  result += el ;
              } ;
          } ;
      });
  
      return `${localLink}${result}`;
      
      } else if (location.includes(localLink)) {
          // Remove => ( \ ) From Location
          let cleanLocation = location.split("\\").join('') ;
            result = cleanLocation ;

          return result ;
      } else {
        return location ;
      }

    }
  };


    }
  }


