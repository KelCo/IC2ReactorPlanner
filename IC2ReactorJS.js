/*jshint esversion: 6 */

/*
  Slot class:
    stores info about the slot
      WIP: Current info
        part type - part
*/
class Slot
{

  constructor(part, loc)
  {

    this.part = part;
    this.loc = loc;
    this.canReflect = false;
    this.pulses = 0;
    this.heat = 0;
    this.dur;
    this.canCool = false;
  }

}

class Selectors
{
  constructor()
  {
    this.active = getId("blank");
    this.id = "blank";
  }
}

class Reactor
{

  constructor()
  {
    this.maxHeat = 10000;
    this.currentHeat = 0;
  }

}



function onLoad()
{

  var elem = document.createElement("img");
  elem.src = "assets/blank.png";
  elem.setAttribute("alt", "blank");
  elem.style.padding = 0;
  elem.style.margin = 0;

  up, down, left, right;

  var i = 0;
  var a = 0;
  var loca;

  selectorGrid = new Selectors();
  grid = [1, 2, 3, 4, 5, 6];

  for( i = 0; i < 6; i++ )
  {
    grid[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for( a = 0; a < 9; a++ )
    {
      loca = "" + i + a;
      grid[i][a] = new Slot("blank", loca);
    }
  }

  reactor = new Reactor();

  validReflect = ["singleU", "dualU", "quadU", "singleMOX", "dualMOX", "quadMOX", "weakReflect", "reflect", "singleThor", "dualThor", "quadThor", "unbreakReflect"];
  vents = ["vent", "diaVent", "coreVent", "spreadVent", "goldVent"];

  selectorGrid.active = getId("blank");
  selectorGrid.id = "blank";
  selectorGrid.active.style.borderColor = "red";


}


function getId(name)
{
  return document.getElementById(name);
}


function select(name)
{

  selectorGrid.active.style.borderColor = "black";
  selectorGrid.active = getId(name);
  selectorGrid.id = name;
  selectorGrid.active.style.borderColor = "red";

}

function calcMaxHeat()
{

  var i = 0;
  var c = 0;
  var total = 10000;

  for( i = 0; i < 6; i++ )
  {
    for( c = 0; c < 9; c++ )
    {
      current = grid[i][c];
      switch(current.part)
      {
        case "plate":
          total += 1000;
          break;
        case "heatPlate":
          total += 1700;
          break;
        case "xpPlate":
          total += 500;
          break;
      }
    }
  }

  reactor.maxHeat = total;
  var out = getId("maxTemp");
  out.innerHTML = "Max Reactor Hull Heat: " + total;


}

function getCard(i, c)
{

  if( i !== 0 )
  {
    up = grid[i-1][c];
  }
  else
  {
    up = null;
  }
  if( i !== 5 )
  {
    down = grid[i+1][c];
  }
  else
  {
    down = null;
  }
  if( c !== 0 )
  {
    left = grid[i][c-1];
  }
  else
  {
    left = null;
  }
  if( c !== 8 )
  {
    right = grid[i][c+1];
  }
  else
  {
    right = null;
  }

}



function runCycle()
{

  var i = 0;
  var c = 0;
  var up, down, left, right;
  var cooling = 0;
  var partHeat = 0;
  var type = 0;
  var divHeat = 0;
  var lHeat = 0;

  for( i = 0; i < 6; i++ )
  {
    for( c = 0; c < 9; c++ )
    {

      current = grid[i][c];
      if( current.canReflect && current.part !== "weakReflect" && current.part !== "reflect" && current.part !== "unbreakReflect")
      {

        type = setPartPulses(current);
        getCard(i, c);
        if(up.canCool)
          cooling++;
        if(down.canCool)
          cooling++;
        if(left.canCool)
          cooling++;
        if(right.canCool)
          cooling++;

        if( current.part !== "singleThor" || current.part !== "dualThor" || current.part != "quadThor")
        {

          partHeat = ((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type;

        }
        else
        {

          partHeat = (((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type) / 4;

        }

        divHeat = Math.trunc(partHeat / cooling);
        lHeat = partHeat - divHeat;

        if(up !== null && up.canCool)
        {
          up.heat += divHeat;
          partHeat -= divHeat;
        }
        if(left !== null && left.canCool)
        {
          left.heat += divHeat;
          partHeat -= divHeat;
        }
        if(right !== null && right.canCool)
        {
          right.heat += divHeat;
          partHeat -= divHeat;
        }
        if(down !== null && down.canCool)
        {
          down.heat += divHeat;
          partHeat -= divHeat;          
        }


      }


    }



  }





}


function simulate()
{

  calcHP();
  calcMaxHeat();

  var iter = 0;

  while( reactor.currentHeat < reactor.maxHeat || iter < 20000 )
  {

    runCycle();



  }


}

function setPartPulses(p)
{

  var type = 0;
  var total = 0;
  var i, c;
  i = parseInt(p.loc.charAt(0));
  c = parseInt(p.loc.charAt(1));

  switch( p.part )
  {
    case "singleU": case "singleMOX": case "singleThor":
      type = 1;
      total += 1;
      break;
    case "dualU": case "dualMOX": case "quadThor":
      total += 2;
      p.pulses = 4;
      break;
    case "quadU": case "quadMOX": case "quadThor":
      type = 4;
      total += 12;
      break;
    }

    getCard(i, c);

    if( up !== null )
      if( up.canReflect )
        total += type;
    if( down !== null )
      if( down.canReflect )
        total += type;
    if( right !== null )
      if( right.canReflect )
        total += type;
    if( left !== null )
      if( left.canReflect )
        total += type;

        p.pulses = total;

        return type;

}



function calcHP()
{

  var i, c, current, down, up, left, right, type;
  var h = 0;
  var p = 0;

  for(i = 0; i < 6; i++)
  {

    for(c = 0; c < 9; c++)
    {

      current = grid[i][c];
      //console.log(current);
      if( current.canReflect && current.part !== "weakReflect" && current.part !== "reflect" && current.part !== "unbreakReflect")
      {

        type = setPartPulses(current);

    switch(current.part)
    {
      case "singleU": case "dualU": case "quadU":
        h += ((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleMOX": case "dualMOX": case "quadMOX":
        h += ((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleThor": case "dualThor": case "quadThor":
        h += (((current.pulses / type) * ((current.pulses / type) + 1) * 2) * type) / 4;
        p += current.pulses;
        break;

        }

      }
    }
  }

  var consoleh = getId("avgHeatOutput");
  var consolep = getId("avgEUOutput");

  consoleh.innerHTML = "Heat Generated Per Second: " + h;
  consolep.innerHTML = "Average Power Per Tick: " + p;


}



function setPart(slot)
{

  var l = slot.charAt(0);
  var num = parseInt(slot.charAt(1));
  var place;

  switch(l)
  {
    case 'a':
      place = grid[0][num-1];
      break;
    case 'b':
      place = grid[1][num-1];
      break;
    case 'c':
      place = grid[2][num-1];
      break;
    case 'd':
      place = grid[3][num-1];
      break;
    case 'e':
      place = grid[4][num-1];
      break;
    case 'f':
      place = grid[5][num-1];
      break;
  }




          if( place.part == selectorGrid.id )
              return;
          if( validReflect.includes(selectorGrid.id) )
            place.canReflect = true;
          if( !validReflect.includes(selectorGrid.id) )
            place.canReflect = false;
          if( getId(slot).childNodes[0] !== null )
            getId(slot).removeChild(getId(slot).childNodes[0]);
          if( vents.includes(selectorGrid.id) )
          {
            place.dur = 1000;
            place.canCool = true;
          }

          var pic = "assets/" + selectorGrid.id + ".png";

          var elem = document.createElement("img");
          elem.src = pic;
          elem.setAttribute("alt", slot);
          elem.style.padding = 0;
          elem.style.margin = 0;
          getId(slot).appendChild(elem);

          place.part = selectorGrid.id;

}
