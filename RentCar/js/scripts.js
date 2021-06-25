/*!
* Start Bootstrap - Agency v7.0.0 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function addCart(nazwa, numer) {
    var item = {};

    item.name = document.getElementById(`nazwa${numer}`).innerHTML;
    item.start = new Date(document.getElementById(`inputstart${numer}`).value);
    item.finish = new Date(document.getElementById(`inputfinish${numer}`).value);
    item.numer = numer;
    item.cost_day = document.getElementById(`day${numer}`).innerText.replace(/\s+/, "");
    item.cost_weekend = item.cost = document.getElementById(`weekend${numer}`).innerText.replace(/\s+/, "");
    item.cost_week = item.cost = document.getElementById(`week${numer}`).innerText.replace(/\s+/, "");
    var duration = Date.parse(item.finish) - Date.parse(item.start);
    item.durationDayFormat = Math.floor(duration / (3600 * 24) / 1000) + 1;

    if (item.finish !== "" && item.start !== "") {
        if (item.start > Date.now() && item.finish >= item.start && item.durationDayFormat <= 7) {
            if (item.durationDayFormat == 7) {
                item.cost = document.getElementById(`week${numer}`).innerText.replace(/\s+/, "");

            }
            else if (item.durationDayFormat == 2) {
                if (item.start.getDay() == 6 && item.finish.getDay() == 0) {
                    item.cost = document.getElementById(`weekend${numer}`).innerText.replace(/\s+/, "");
                } else {
                    item.cost = document.getElementById(`day${numer}`).innerText.replace(/\s+/, "");
                    item.cost *= item.durationDayFormat;
                }
            } else {
                item.cost = document.getElementById(`day${numer}`).innerText.replace(/\s+/, "");
                item.cost *= item.durationDayFormat;
            }

            if (localStorage.getItem(item.name) === null) {
                localStorage.setItem(item.name, JSON.stringify(item));
                document.getElementById(`errors${numer}`).innerHTML = "Pomyślnie dodano do koszyka!"
            } else {
                document.getElementById(`errors${numer}`).innerHTML = "Pojazd już znajduje się w koszyku"
            }
        } else {
            if (item.start < Date.now()) {
                document.getElementById(`errors${numer}`).innerHTML = "Wprodzono zły zakres czasu!";
            } else if (item.durationDayFormat > 7) {
                document.getElementById(`errors${numer}`).innerHTML = "Maksymalny czas najmu to 7dni";
            } else if (item.finish < item.start) {
                document.getElementById(`errors${numer}`).innerHTML = "Nie możesz oddać auta przed wypożyczeniem go upss";
            }
        }
    } else {
        document.getElementById(`errors${numer}`).innerHTML = "Nie wprowadzono daty lub data jest błędna!"
    }

}

function displayCart() {

    if (window.localStorage.length != 0) {
        document.getElementById("realize").disabled = false;
        // var dane = "<table class='tableCart'> <tr><td></td><td><strong>Pojazd</strong></td><td width='30%'><strong>Data rozpoczęcia</strong></td><td width='30%'><strong>Data zakończenia</strong></td><td width='30%' ><strong>Koszt</strong></td><td></td></tr>";
        var danealt = "<div id='cartshop'>";
        var totalamount = 0;
        for (x = 0; x < localStorage.length; x++) {

            //dane +="<button id='"+ localStorage.key(x) + " '>X</button> "+ localStorage.getItem(localStorage.key(x))+"<br>";
            var obj = JSON.parse(localStorage.getItem(localStorage.key(x)));
            var id_to_remove = obj.name;

            totalamount += obj.cost * 1;
            // dane += `<tr><td><img src=assets/img/portfolio/mini${obj.numer}.jpg alt='...' /></td><td>` + obj.name + "</td><td>" + obj.start.toString('DD-MM-YYYY').substring(0, 10) + "</td><td>" + obj.finish.toString('DD-MM-YYYY').substring(0, 10) + `</td><td>${obj.cost} PLN</td><td><button class="btn" onclick="remove('${id_to_remove}')"><i style="font-size:24px" class="fa">&#xf00d;</i></button></td>`;
            danealt += `<div id="cartimg"><img src=assets/img/portfolio/mini${obj.numer}.jpg alt='...' /></div><div id="cartinfo"><ul class="cartlist"><li>Pojazd: ${obj.name}</li><li id="startdate${obj.numer}">Data rozpoczęcia: ${(obj.start.toString('DD-MM-YYYY').substring(0, 10))}<button class="btn" onclick="editStart('${id_to_remove}','${obj.numer}')"><i class="fa">&#xf044;</i></button></li><li id="finishdate${obj.numer}">Data zakończenia: ${(obj.finish.toString('DD-MM-YYYY').substring(0, 10))}<button class="btn" onclick="editFinish('${id_to_remove}','${obj.numer}')"><i class="fa">&#xf044;</i></button></li><li>Koszt: ${obj.cost} PLN</li><li><button class="btn" onclick="remove('${id_to_remove}')"><i style="font-size:24px" class="fa">&#xf00d;</i></button></li></ul></div>`
        }
        // dane += "</tr></table>";
        danealt += `</div><p class="total"> Suma:&nbsp;&nbsp;&nbsp;&nbsp;${totalamount} PLN</p> `;
        document.getElementById("result").innerHTML = danealt;
    }
    else {
        document.getElementById("realize").disabled = true;
        document.getElementById("result").innerHTML = "Koszyk jest pusty";
    }



}


function displaySummaryCart() {

    if (window.localStorage.length != 0) {
        document.getElementById("realize").disabled = false;
        // var dane = "<table class='tableCart'> <tr><td></td><td><strong>Pojazd</strong></td><td width='30%'><strong>Data rozpoczęcia</strong></td><td width='30%'><strong>Data zakończenia</strong></td><td width='30%' ><strong>Koszt</strong></td><td></td></tr>";
        var danealt = ""
        danealt += "<div id='cartshop'>";
        var totalamount = 0;
        for (x = 0; x < localStorage.length; x++) {

            //dane +="<button id='"+ localStorage.key(x) + " '>X</button> "+ localStorage.getItem(localStorage.key(x))+"<br>";
            var obj = JSON.parse(localStorage.getItem(localStorage.key(x)));
            var id_to_remove = obj.name;

            totalamount += obj.cost * 1;
            // dane += `<tr><td><img src=assets/img/portfolio/mini${obj.numer}.jpg alt='...' /></td><td>` + obj.name + "</td><td>" + obj.start.toString('DD-MM-YYYY').substring(0, 10) + "</td><td>" + obj.finish.toString('DD-MM-YYYY').substring(0, 10) + `</td><td>${obj.cost} PLN</td><td><button class="btn" onclick="remove('${id_to_remove}')"><i style="font-size:24px" class="fa">&#xf00d;</i></button></td>`;
            danealt += `<div id="cartimg"><img src=assets/img/portfolio/mini${obj.numer}.jpg alt='...' /></div><div id="cartinfo"><ul class="cartlist"><li>Pojazd: ${obj.name}</li><li id=startdate${obj.numer}>Data rozpoczęcia: ${(obj.start.toString('DD-MM-YYYY').substring(0, 10))}</li><li>Data zakończenia: ${(obj.finish.toString('DD-MM-YYYY').substring(0, 10))}</li><li>Koszt: ${obj.cost} PLN</li></ul></div>`
        }
        // dane += "</tr></table>";
        danealt += `</div><p class="total"> Suma:&nbsp;&nbsp;&nbsp;&nbsp;${totalamount} PLN</p> <br ><button onclick='clearAll()' data-bs-toggle="modal"  id="realize" class="btn btn-primary btn-xl text-uppercase"
        data-bs-dismiss="modal" type="button">
        <i class="fas fa-check-circle"></i>
        Zakończ
    </button>`;
        document.getElementById("result").innerHTML = danealt;
    }
    else {
        document.getElementById("realize").disabled = true;
        document.getElementById("result").innerHTML = "Koszyk jest pusty";
    }

    return danealt;

}

function remove(removeID) {
    localStorage.removeItem(removeID);
    displayCart();
}

function clearAll() {
    for (x in localStorage) {
        localStorage.removeItem(x);
    }
    window.location.reload(true);
}

function prizeUpdate(removeID, numer) {
    var item = JSON.parse(localStorage.getItem(removeID));

    var start = new Date(item.start);
    var finish = new Date(item.finish);
    if (item.durationDayFormat == 7) {
        item.cost = item.cost_week

    }
    else if (item.durationDayFormat == 2) {
        // console.log(start.getDay());
        // console.log(finish.getDay());
        if (start.getDay() == 6 && finish.getDay() == 0) {
            item.cost = item.cost_weekend;
        } else {
            item.cost = item.cost_day;
            item.cost *= item.durationDayFormat;
        }
    } else {
        item.cost = item.cost_day;
        item.cost *= item.durationDayFormat;
    }



    localStorage.setItem(item.name, JSON.stringify(item));
}

function editStart(removeID, numer) {
    document.getElementById(`startdate${numer}`).innerHTML = `Data rozpoczęcia: <input required id="newstartdate" type='date'> <button class="btn" onclick="editStart_conf('${removeID}','${numer}')"><i class='fa'>&#xf00c;</i></button>`
}
function editStart_conf(removeID, numer) {
    if ((document.getElementById("newstartdate").value) != "") {
        newDate = new Date(document.getElementById("newstartdate").value);
        var obj = JSON.parse(localStorage.getItem(removeID));
        finishDate = new Date(obj.finish);

        var duration = Date.parse(finishDate) - Date.parse(newDate);
        obj.durationDayFormat = Math.floor(duration / (3600 * 24) / 1000) + 1;

        if (newDate <= Date.now()) {
            window.alert("nie mozesz cofnac sie w czasie")
        } else if (newDate > finishDate) {
            window.alert("Nie możesz ustawic daty pozniejszej niz data oddania")
        } else if (obj.durationDayFormat > 7) {
            window.alert("Nie możesz przekroczyć 7 dni najmu");
        } else {
            obj.start = newDate;
            obj.durationDayFormat = Math.floor(duration / (3600 * 24) / 1000) + 1;
            localStorage.setItem(obj.name, JSON.stringify(obj));
            prizeUpdate(removeID, numer);
            displayCart();
        }
    } else {
        window.alert("Nie możesz zostawić pustego pola z datą");
    }
}


function editFinish(removeID, numer) {
    document.getElementById(`finishdate${numer}`).innerHTML = `Data rozpoczęcia: <input required id="newfinishdate" type='date'> <button class="btn" onclick="editFinish_conf('${removeID}','${numer}')"><i class='fa'>&#xf00c;</i></button>`
}
function editFinish_conf(removeID, numer) {
    if ((document.getElementById("newfinishdate").value) != "") {

        newDate = new Date(document.getElementById("newfinishdate").value);
        var obj = JSON.parse(localStorage.getItem(removeID));
        startDate = new Date(obj.start);

        var duration = Date.parse(newDate) - Date.parse(obj.start);
        obj.durationDayFormat = Math.floor(duration / (3600 * 24) / 1000) + 1;

        if (newDate < startDate) {
            window.alert("Nie mozesz oddac auta przed jego wypozyczeniem");
        } else if (obj.durationDayFormat > 7) {
            window.alert("Nie możesz przekroczyć 7 dni najmu");
        } else {
            obj.finish = newDate;
            obj.durationDayFormat = Math.floor(duration / (3600 * 24) / 1000) + 1;
            localStorage.setItem(obj.name, JSON.stringify(obj));
            prizeUpdate(removeID, numer);
            //localStorage.setItem(obj.name, JSON.stringify(obj));


            displayCart();
        }



    } else {
        window.alert("Nie możesz zostawić pustego pola z datą");
    }
}



function loadAuto(nazwa, numer) {
    let fetchString = `http://localhost/RentCar/cars/auto${numer}.txt`;
    var but1 = document.getElementById(nazwa);
    but1.addEventListener('click', function () {
        fetch(fetchString)
            .then(response => { return response.text(); })
            .then(dane => { document.getElementById(`modal${numer}`).innerHTML = dane; })
        //.then(addCart(`dodaj${numer}`,numer))
    },
        false);
}





function summary() {
    var displayCarInfo = displaySummaryCart();
    var displaySummary = "<h2>Podsumowanie</h2>";
    var sObj = {};


    sObj.imie = document.getElementById('first_name').value;
    sObj.nazwisko = document.getElementById('surname').value;
    sObj.email = document.getElementById('ademail').value;
    sObj.tel = document.getElementById('phonenum').value;
    sObj.ulica = document.getElementById('street').value;
    sObj.numerd = document.getElementById('street_number').value;
    sObj.kod = document.getElementById('post_code').value;
    sObj.miasto = document.getElementById('city').value;
    var radio =document.getElementsByName('gridRadios');
    for(i = 0; i < radio.length; i++) {
        if(radio[i].checked)
        sObj.usluga=radio[i].value;
    }

    var dataToShow = `<h1>Podsumowanie</h1>
                            <div id="cartshop">
                                <div id="personalData">
                                    <ul class="cartlist">
                                        <li>Imię:</li>
                                        <li>Nazwisko:</li>
                                        <li>Email:</li>
                                        <li>Nr. tel:</li>
                                        <li>Ulica:</li>
                                        <li>Miasto:</li>
                                        <li>Dodatkowe usługi:</li>
                                    </ul>
                                </div>
                                <div id="personalData2">
                                    <ul class="cartlist">
                                        <li>${sObj.imie}</li>
                                        <li>${sObj.nazwisko}</li>
                                        <li>${sObj.email}</li>
                                        <li>${sObj.tel}</li>
                                        <li>${sObj.ulica} ${sObj.numerd}</li>
                                        <li>${sObj.miasto} ${sObj.kod}</li>
                                        <li>${sObj.usluga}</li>
                                    </ul>
                                </div>
                            </div>
                            `



    //displaySummary += `Imie: ${sObj.imie}<br>Nazwisko: ${sObj.nazwisko}<br>email: ${sObj.email}<br>Nr. tel:${sObj.tel}`;
    document.getElementById("summaryScreen").innerHTML = `${dataToShow} <h1>Twoje zamówienie</h1> ${displayCarInfo}`;
    //window.prompt(displaySummary);




}



document.addEventListener("DOMContentLoaded", function () {
    loadAuto("click1", 1);
    loadAuto("click2", 2);
    loadAuto("click3", 3);
    loadAuto("click4", 4);
    loadAuto("click5", 5);
    loadAuto("click6", 6);
    loadAuto("click7", 7);
    loadAuto("click8", 8);
    loadAuto("click9", 9);

    //addCart("dodaj9",9);


})

