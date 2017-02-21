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

          if(getId(loc).childNodes[0] !== null)
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
