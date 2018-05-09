  /*****************/
 /* APP VARIABLES */
/*****************/

const BLANK = 'ß';
var Tick = undefined;
ID = 1;
var Machines = {
    1 : new Array(),
    2 : new Array(),
    3 : new Array(),
    4 : new Array(),
    5 : new Array(),
}


  /****************/
 /* UI FUNCTIONS */
/****************/

$(function() {
    Clear();

    $('#elemento1').click(function(){
        ID = 1;
        ClearRows(1);
        document.getElementById("etiqueta").innerText = "Sumador";
    });
    $('#elemento2').click(function(){
        ID = 2;
        ClearRows(2);
        document.getElementById("etiqueta").innerText = "Restador";
    });
    $('#elemento3').click(function(){
        ID = 3;        
        ClearRows(3);
        document.getElementById("etiqueta").innerText = "Duplicador";
    });
    $('#elemento4').click(function(){
        ID = 4;
        ClearRows(4);
        document.getElementById("etiqueta").innerText = "Palíndromo";
    });
    $('#elemento5').click(function(){
        ID = 5;
        ClearRows(5);
        document.getElementById("etiqueta").innerText = "Multiplicador";
    });
    $('#info').click(function(){
        $('#instrucciones' + ID).modal('show');
    });
});

function ScrollToID(id, time, table){

    container = $('#tabla' + table);
    item = $('#' + id);
    $('body').animate({ scrollTop: item.offset().top - container.offset().top + container.scrollTop() }, time >= 0 ? time:600, 'swing');
}

function ScrollLeftToID(id, time, table){

    container = $('#tabla' + table);
    item = $('#' + id);
    $('#tabla' + table).animate({ scrollLeft: item.offset().left - 5 * container.offset().left + container.scrollLeft() }, time >= 0 ? time:600, 'swing');
}

function AddRow(value, id_value, class_value, table){

    container = $('#tabla' + table + " tbody")
    item = `<td id='${id_value}' class='${class_value}'>
                ${value}
            </td>`
    container.append(item);
    return true
}

function ClearRows(table){

    $('#tabla' + table + " tbody td").remove();
    return true
}

function ChangeActiveRow(table, time) { // This method requieres that 'the caller' sets row's id as 'new-row' before call this. 

    /* Remove old active row*/
    oldRow = $('#active-row');
    oldRow.attr('id', '');
    oldRow.attr('class', '');

    /* Set new active row*/
    newRow = $('#new-row');
    newRow.attr('id', 'active-row');    
    ScrollLeftToID('active-row', time, table);
    newRow.attr('class', 'bg-info text-light');
}

function Clear(){
    // Popups
    $('[data-toggle="popover1"]').popover();
    $('#myModal').modal('hide');
    $('#instrucciones').modal('hide');

    // SET MATCHINES
    SetMachine1();
    SetMachine2();
    SetMachine3();
    SetMachine4();
    SetMachine5();

    // SET COUNT
    $('#contador').text(Machines[ID].Count);

    // SET STATE TO MACHINE'S HEAD
    $('#estado').text(Machines[ID].Count);
}

function Update(){
       // SET COUNT
       $('#contador').text(Machines[ID].Count);
   
       // SET STATE TO MACHINE'S HEAD
       $('#estado').text(Machines[ID].State);
}