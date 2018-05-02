$(function() {

    $('#cargar').click(function(){
        id = this.getAttribute('content');
        if($('#cadena' + id).val() == ""){
            $(this).popover('show');
            return false;
        }else{
            $(this).popover('hide');
        }
        LoadString('1')
        Clear();
        return true;
    });


    $('#evaluar').click(

        function(){
            id = this.getAttribute('content');
            time = 1000 - $("#rango" + id).val();
            var ex = setInterval(function(){Evaluate(id)}, time);
        }


    );
});

  /******************/
 /* CORE FUNCTIONS */
/******************/

function AddBlank(table){
    for(i = 0; i < 5; i++){
        AddRow(BLANK, "", "", table);
    }
    return true;
}

function LoadString(table){
    var cadena = $('#cadena' + table).val();
        ClearRows(table);
        AddRow(cadena.charAt(0), "active-row", "bg-info text-light", table);
        for(i = 1; i < cadena.length; i++){
            AddRow(cadena.charAt(i), "", "", table);
        }
        AddBlank(table);
        return true;
}

function EvaluateStep(symbol, id){
    Machines[id].Count++;
    symbols = Machines[id][Machines[id].State]

    if(symbols[symbol] == undefined) return { Error : true, Acceptable : Machines[id].Functions.Acceptable(Machines[id].State), Message : `El símbolo <strong>'{symbol}'</strong> no tiene transición definida en el estado <strong>${Machines[id].State}</strong>`};

    NextValues = symbols[symbol];
    Machines[id].State = NextValues[1];
    return { Error : false, Acceptable: Machines[id].Functions.Acceptable(Machines[id].State), Output : NextValues[0], Movement : NextValues[2] };
}

function Evaluate(id){
        chain = $("#tabla" + id + " td");
        i = Machines[id].i;

        if(!Machines[id].Functions.Acceptable(Machines[id].State) && chain.length > i){
            time = 1000 - $("#rango" + id).val();
            result = EvaluateStep(chain[i].innerHTML, id);
            if(result.Error){
                $('#modalTitle').html('Error: cadena inválida.');
                $('#modalText').html(result.Message);
                $('#myModal').modal('show');
                Update();
                clearInterval(Tick);
            }

            if (i >= chain.length - 1) AddBlank(id);
            chain[i].textContent = (result.Output);
            i += result.Movement;
            Machines[id].i += result.Movement;
            chain[i].setAttribute('id', 'new-row');
            ChangeActiveRow(id, time);
            Update();
        }

        if(Machines[id].Functions.Acceptable(Machines[id].State)){
            $('#modalTitle').html('Fin: cadena válida.');
            $('#modalText').html('La cadena ingresada es válida. Puede ver el resultado en la cinta.');
            $('#myModal').modal('show');
            Update();
            clearInterval(Tick);
        }

        if(Machines[id].Functions.Count >= 1000){
            $('#modalTitle').html('Error: cadena inválida.');
            $('#modalText').html('La cadena ingresada ha generado muchas transiciones sin definir un resultado.');
            $('#myModal').modal('show');
            Update();
            clearInterval(Tick);
        }
}

// SYNTAXIS Machine[CURRENT_STATE] = { INCOMING_SYMBOL: [OUTPUT_SYMBOL, NEXT_STATE, HEAD_MOVEMENT]}

function SetMachine1(){
    Machines[1][0] = {
        '1' : ['X', 1, 1],
        '+' : ['X', 0, 1],
        '=' : ['=', 3, 1],
        'ß' : ['ß', 0, 1]
    };

    Machines[1][1] = {
        '1' : ['1', 1, 1],
        '+' : ['+', 1, 1],
        '=' : ['=', 1, 1],
        'ß' : ['1', 2, -1]
    };

    Machines[1][2] = {
        '1' : ['1', 2, -1],
        '+' : ['+', 2, -1],
        '=' : ['=', 2, -1],
        'X' : ['X', 0, 1]
    };

    Machines[1][3] = {
        '1' : ['1', 3, 1],
        'ß' : ['1', 3, 1]
    };
    Machines[1]['i'] = 0;
    Machines[1]['Count'] = 0;
    Machines[1]['State'] = 0;
    Machines[1]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}

function SetMachine2(){
    Machines[2]['i'] = 0;
    Machines[2]['Count'] = 0;
    Machines[2]['State'] = 0;
    Machines[2]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}

function SetMachine3(){
    Machines[3]['i'] = 0;
    Machines[3]['Count'] = 0;
    Machines[3]['State'] = 0;
    Machines[3]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}

function SetMachine4(){
    Machines[4]['i'] = 0;
    Machines[4]['Count'] = 0;
    Machines[4]['State'] = 0;
    Machines[4]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}

function SetMachine5(){
    Machines[5]['i'] = 0;
    Machines[5]['Count'] = 0;
    Machines[5]['State'] = 0;
    Machines[5]['Functions'] = {
        Acceptable(state) { return state == 3 }
    };
}