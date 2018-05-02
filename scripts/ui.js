  /*****************/
 /* APP VARIABLES */
/*****************/

const BLANK = 'ß';
var Tick = undefined;
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
});

function ScrollToID(id, time, table){

    container = $('#tabla' + table);
    item = $('#' + id);
    $('body').animate({ scrollTop: item.offset().top - container.offset().top + container.scrollTop() }, time >= 0 ? time:600, 'swing');
}

function AddRow(value, id_value, class_value, table){

    container = $('#tabla' + table + " tbody")
    item = `<tr id='${id_value}' class='${class_value}'>
                <td>${value}</td>
            </tr>`
    container.append(item);
    return true
}

function ClearRows(table){

    $('#tabla' + table + " tbody tr").remove();
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
    ScrollToID('active-row', time, table);
    newRow.attr('class', 'bg-info text-light');
}

function Clear(){
    // Popups
    $('[data-toggle="popover1"]').popover();
    $('#myModal').modal('hide');
    // SET MATCHINES
    SetMachine1();
    SetMachine2();
    SetMachine3();
    SetMachine4();
    SetMachine5();

    // SET COUNT
    $('#contador1').text(Machines[1].Count);
    $('#contador2').text(Machines[2].Count);
    $('#contador3').text(Machines[3].Count);
    $('#contador4').text(Machines[4].Count);
    $('#contador5').text(Machines[5].Count);

    // SET STATE TO MACHINE'S HEAD
    $('#estado1').text(Machines[1].Count);
    $('#estado2').text(Machines[2].Count);
    $('#estado3').text(Machines[3].Count);
    $('#estado4').text(Machines[4].Count);
    $('#estado5').text(Machines[5].Count);
}

function Update(){
       // SET COUNT
       $('#contador1').text(Machines[1].Count);
       $('#contador2').text(Machines[2].Count);
       $('#contador3').text(Machines[3].Count);
       $('#contador4').text(Machines[4].Count);
       $('#contador5').text(Machines[5].Count);
   
       // SET STATE TO MACHINE'S HEAD
       $('#estado1').text(Machines[1].State);
       $('#estado2').text(Machines[2].State);
       $('#estado3').text(Machines[3].State);
       $('#estado4').text(Machines[4].State);
       $('#estado5').text(Machines[5].State);
}