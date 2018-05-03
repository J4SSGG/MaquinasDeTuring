$(function() {

    $('#cargar').click(function(){
        id = ID;
        if($('#cadena').val() == ""){
            $(this).popover('show');
            return false;
        }else{
            $(this).popover('hide');
            LoadString(id)
            Clear();
            return true;
        }
    });

    $('#evaluar').click(

        function(){
            id = ID;
            time = 1000 - $("#rango").val();
            Tick = setInterval(function(){Evaluate(id)}, time)
        }

    );
});

  /******************/
 /* CORE FUNCTIONS */
/******************/

function AddBlank(table){
    for(i = 0; i < 100; i++){
        AddRow(BLANK, "", "", table);
    }
    return true;
}

function LoadString(table){
    var cadena = $('#cadena').val();
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

    if(symbols[symbol] == undefined) return { Error : true, Acceptable : Machines[id].Functions.Acceptable(Machines[id].State), Message : `El símbolo <strong>'${symbol}'</strong> no tiene transición definida en el estado <strong>${Machines[id].State}</strong>`};

    NextValues = symbols[symbol];
    Machines[id].State = NextValues[1];
    return { Error : false, Acceptable: Machines[id].Functions.Acceptable(Machines[id].State), Output : NextValues[0], Movement : NextValues[2] };
}

function Evaluate(id){
        chain = $("#tabla" + id + " td");
        i = Machines[id].i;

        if(!Machines[id].Functions.Acceptable(Machines[id].State) && chain.length > i && Machines[id].Count < 10000){
            time = 1000 - $("#rango").val();
            result = EvaluateStep(chain[i].innerHTML, id);
            if(result.Error){
                Update();
                Stop();
                $('#modalTitle').html('Error: cadena inválida.');
                $('#modalText').html(result.Message);
                $('#myModal').modal('show');
               
            }else{
                if (i >= chain.length - 2) AddBlank(id);
                chain[i].textContent = (result.Output);
                i += result.Movement;
                Machines[id].i += result.Movement;
                chain[i].setAttribute('id', 'new-row');
                ChangeActiveRow(id, time);
                Update();
            }

            
        }else{
            if(Machines[id].Functions.Acceptable(Machines[id].State)){
                Update();            
                Stop();
                $('#modalTitle').html('Fin: cadena válida.');
                $('#modalText').html('La cadena ingresada es válida. Puede ver el resultado en la cinta.');
                $('#myModal').modal('show');
                
            }
    
            if(Machines[id].Count >= 10000){
                Update();
                Stop();
                $('#modalTitle').html('Error: cadena inválida.');
                $('#modalText').html('La cadena ingresada ha generado muchas transiciones sin definir un resultado.');
                $('#myModal').modal('show');
            }
        }

        
}

function Stop(){
    clearInterval(Tick);
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
    Machines[2][0] = {
        '1' : ['X', 1, 1],
        '-' : ['-', 3, 1]
    }

    Machines[2][1] = {
        '1' : ['1', 1, 1],
        '-' : ['-', 1, 1],
        '=' : ['=', 1, 1],
        'ß' : ['1', 2, -1]
    }
    
    Machines[2][2] = {
        '1' : ['1', 2, -1],
        '-' : ['-', 2, -1],
        '=' : ['=', 2, -1],
        'X' : ['X', 0, 1],
        'Y' : ['Y', 3, 1]        
        
    }

    Machines[2][3] = {
        '=' : ['=', 4, -1],
        '1' : ['Y', 1, 1]
    }

    Machines[2][4] = {
        'Y' : ['Z', 5, 1],
        '-' : ['_', 9, 1]
    }

    Machines[2][5] = {
        '1' : ['1', 5, 1],
        'Z' : ['Z', 5, 1],
        '=' : ['=', 5, 1],
        'ß' : ['ß', 6, -1]
    }

    Machines[2][6] = {
        '1' : ['ß', 7, -1]
    }

    Machines[2][7] = {
        '1' : ['ß', 8, -1]
    }

    Machines[2][8] = {
        '1' : ['1', 8, -1],
        '-' : ['-', 8, -1],
        '=' : ['=', 8, -1],
        'Z' : ['Z', 8, -1],
        'Y' : ['Z', 5, 1],
        'X' : ['X', 9, 1]
    }

    Machines[2][9] = {
        '1' : ['1', 9, 1],
        '-' : ['-', 9, 1],
        '=' : ['=', 9, 1],
        'Z' : ['Z', 9, 1],
        'ß' : ['ß', 9, 1]
    }


    Machines[2]['i'] = 0;
    Machines[2]['Count'] = 0;
    Machines[2]['State'] = 0;
    Machines[2]['Functions'] = {
        Acceptable(state) { return state == 9 }
    };
}

function SetMachine3(){
    Machines[3][0] = {
        'a' : ['A', 1, 1],
        'b' : ['B', 3, 1],
        'c' : ['C', 5, 1],
        'X' : ['a', 7, 1],
        'Y' : ['b', 7, 1],
        'Z' : ['c', 7, 1]
    }

    Machines[3][1] = {
        'a' : ['a', 1, 1],
        'b' : ['b', 1, 1],
        'c' : ['c', 1, 1],
        'X' : ['X', 1, 1],
        'Y' : ['Y', 1, 1],
        'Z' : ['Z', 1, 1],
        'ß' : ['X', 2, -1]
    }
    
    Machines[3][2] = {
        'a' : ['a', 2, -1],
        'b' : ['b', 2, -1],
        'c' : ['c', 2, -1],
        'X' : ['X', 2, -1],
        'Y' : ['Y', 2, -1],
        'Z' : ['Z', 2, -1],
        'A' : ['a', 0, 1]        
    }

    Machines[3][3] = {
        'a' : ['a', 3, 1],
        'b' : ['b', 3, 1],
        'c' : ['c', 3, 1],
        'X' : ['X', 3, 1],
        'Y' : ['Y', 3, 1],
        'Z' : ['Z', 3, 1],
        'ß' : ['Y', 4, -1]
    }

    Machines[3][4] = {
        'a' : ['a', 4, -1],
        'b' : ['b', 4, -1],
        'c' : ['c', 4, -1],
        'X' : ['X', 4, -1],
        'Y' : ['Y', 4, -1],
        'Z' : ['Z', 4, -1],
        'B' : ['b', 0, 1]  
    }

    Machines[3][5] = {
        'a' : ['a', 5, 1],
        'b' : ['b', 5, 1],
        'c' : ['c', 5, 1],
        'X' : ['X', 5, 1],
        'Y' : ['Y', 5, 1],
        'Z' : ['Z', 5, 1],
        'ß' : ['Z', 6, -1]
    }

    Machines[3][6] = {
        'a' : ['a', 6, -1],
        'b' : ['b', 6, -1],
        'c' : ['c', 6, -1],
        'X' : ['X', 6, -1],
        'Y' : ['Y', 6, -1],
        'Z' : ['Z', 6, -1],
        'C' : ['c', 0, 1] 
    }

    Machines[3][7] = {        
        'X' : ['a', 7, 1],
        'Y' : ['b', 7, 1],
        'Z' : ['c', 7, 1],
        'ß' : ['ß', 8, 1]
    }

    Machines[3][8] = {
        'a' : ['a', 8, 1],
        'b' : ['b', 8, 1],
        'c' : ['c', 8, 1],
        'X' : ['X', 8, 1],
        'Y' : ['Y', 8, 1],
        'Z' : ['Z', 8, 1],
        'ß' : ['ß', 8, 1] 
    }
    Machines[3]['i'] = 0;
    Machines[3]['Count'] = 0;
    Machines[3]['State'] = 0;
    Machines[3]['Functions'] = {
        Acceptable(state) { return state == 8 }
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