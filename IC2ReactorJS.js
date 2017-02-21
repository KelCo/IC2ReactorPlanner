/*jshint esversion: 6 */

/*
  Slot class:
    stores info about the slot

      WIP: Current info
        part type - part


*/
class Slot
{

  constructor(part, loc, canReflect)
  {

    this.part = part;
    this.loc = loc;
    this.canReflect = canReflect;
    this.pulses = 0;

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


function onLoad()
{

  var elem = document.createElement("img");
  elem.src = "assets/blank.png";
  elem.setAttribute("alt", "blank");
  elem.style.padding = 0;
  elem.style.margin = 0;


  var i = 1;
  var a = 1;
  var first = a;

  selectorGrid = new Selectors();
  emptySlot = new Slot("blank");
  row = [emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot];
  grid = [row, row, row, row, row, row];
  validReflect = ["singleU", "dualU", "quadU", "singleMOX", "dualMOX", "quadMOX", "weakReflect", "reflect", "singleThor", "dualThor", "quadThor", "unbreakReflect"];

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

      if(current.canReflect)
      {
      switch(current.part)
      {
        case "singleU" || "singleMOX" || "singleThor":
          type = 1;
          current.pulses += 1;
          break;
        case "dualU" || "dualMOX" || "quadThor":
          type = 2;
          current.pulses += 4;
          break;
        case "quadU" || "quadMOX" || "quadThor":
          type = 4;
          current.pulses += 12;
          break;

    }

    up = grid[i-1][c];
    down = grid[i+1][c];
    left = grid[i][c-1];
    right = grid[i][c+1];

    if( up != null && up.canReflect)
    {
      current.pulses += type;
    }
    if( down != null && up.canReflect)
    {
      current.pulses += type;
    }
    if( right != null && up.canReflect)
    {
      current.pulses += type;
    }
    if( left != null && up.canReflect)
    {
      current.pulses += type;
    }

    switch(current.part)
    {
      case "singleU" || "dualU" || "quadU":
        h += ((current.pulses) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleMOX" || "dualMOX"  || "quadMOX":
        h += ((current.pulses) * ((current.pulses / type) + 1) * 2) * type;
        p += current.pulses * 5;
        break;
      case "singleThor" || "dualThor" || "quadThor":
        h += (((current.pulses) * ((current.pulses / type) + 1) * 2) * type) / 4;
        p += current.pulses;
        break;

        }
      }
    }
  }




}



function setPart(slot)
{

  var l = slot.charAt(0);
  var num = parseInt(slot.charAt(1));
  var loc = slot;

  switch(l)
  {
    case 'a':
      slot = grid[0][num-1];
      break;
    case 'b':
      slot = grid[1][num-1];
      break;
    case 'c':
      slot = grid[2][num-1];
      break;
    case 'd':
      slot = grid[3][num-1];
      break;
    case 'e':
      slot = grid[4][num-1];
      break;
    case 'f':
      slot = grid[5][num-1];
      break;
  }




          if(slot.part == selectorGrid.active)
          {
              return;
          }

          if( validReflect.includes(selectorGrid.id))
          {
            slot.part.canReflect = true;
          }

          if(getId(loc).childNodes[0] != null)
          {
          getId(loc).removeChild(getId(loc).childNodes[0]);
          }

          var pic = "assets/" + selectorGrid.id + ".png";

          var elem = document.createElement("img");
          elem.src = pic;
          elem.setAttribute("alt", loc);
          elem.style.padding = 0;
          elem.style.margin = 0;
          getId(loc).appendChild(elem);

          slot.part = loc;

}
function simulate()
{

}
