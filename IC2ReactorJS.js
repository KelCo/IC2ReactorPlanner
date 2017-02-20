/*jshint esversion: 6 */
/*Be Better than this git*/

/*
  ReactorGrid class:
    stores reactor grid info into one structure
    for easy function passing.

    Stores the rows in the reactor, each row is a Row class.

*/
class ReactorGrid
{

  constructor(a, b, c, d, e, f)
  {

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;

  }

  }

  /*

  Row class:
    stores each part in an array in a row.
    constructors are slot classes

  */
  class Row
  {

    constructor(one, two, three, four, five, six, seven, eight, nine)
    {

      this.one = one;
      this.two = two;
      this.three = three;
      this.four = four;
      this.five = five;
      this.six = six;
      this.seven = seven;
      this.eight = eight;
      this.nine = nine;

    }
  }

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
  row = new Row(emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot)
  grid = new ReactorGrid(row, row, row, row, row, row);

/*
  Object.keys(grid).forEach( k =>
  {
    a = 1;

    Object.keys(k).forEach( x =>
    {

      switch(i)
      {
        case 1:
          first = "a";
        case 2:
          first = "b";
        case 3:
          first = "c";
        case 4:
          first = "d";
        case 5:
          first = "e";
        case 6:
          first = "f";
      }

      x.loc = "" + first + a;
      x.part = "blank";
      console.log(x);
      getId("" + first + a).appendChild(elem);

      a++;
    }
)
    i++;

  }
);
*/

selectorGrid.active = getId("blank");
selectorGrid.id = "blank";
selectorGrid.active.style.border = "2px solid red";


}


function getId(name)
{
  return document.getElementById(name);
}


function select(name)
{

  selectorGrid.active.style.border = "1px solid black";
  selectorGrid.active = getId(name);
  selectorGrid.id = name;
  selectorGrid.active.style.border = "1px solid red";

}







function setPart(slot)
{

  var l = slot.charAt(0);
  var num = slot.charAt(1);
  var loc = slot;

  switch(l)
  {
    case 'a':
    switch(num)
    {
      case '1':
        slot = grid.a.one;
        break;
      case '2':
        slot = grid.a.two;
        break;
      case '3':
        slot = grid.a.three;
        break;
      case '4':
        slot = grid.a.four;
        break;
      case '5':
        slot = grid.a.five;
        break;
      case '6':
        slot = grid.a.six;
        break;
      case '7':
        slot = grid.a.seven;
        break;
      case '8':
        slot = grid.a.eight;
        break;
      case '9':
        slot = grid.a.nine;
        break;
      }
      case 'b':
      switch(num)
      {
        case '1':
          slot = grid.b.one;
          break;
        case '2':
          slot = grid.b.two;
          break;
        case '3':
          slot = grid.b.three;
          break;
        case '4':
          slot = grid.b.four;
          break;
        case '5':
          slot = grid.b.five;
          break;
        case '6':
          slot = grid.b.six;
          break;
        case '7':
          slot = grid.b.seven;
          break;
        case '8':
          slot = grid.b.eight;
          break;
        case '9':
          slot = grid.b.nine;
          break;
      }
    case 'c':
      switch(num)
      {
        case '1':
          slot = grid.c.one;
          break;
        case '2':
          slot = grid.c.two;
          break;
        case '3':
          slot = grid.c.three;
          break;
        case '4':
          slot = grid.c.four;
          break;
        case '5':
          slot = grid.c.five;
          break;
        case '6':
          slot = grid.c.six;
          break;
        case '7':
          slot = grid.c.seven;
          break;
        case '8':
          slot = grid.c.eight;
          break;
        case '9':
          slot = grid.c.nine;
          break;
      }
      case 'd':
      switch(num)
      {
        case '1':
          slot = grid.d.one;
          break;
        case '2':
          slot = grid.d.two;
          break;
        case '3':
          slot = grid.d.three;
          break;
        case '4':
          slot = grid.d.four;
          break;
        case '5':
          slot = grid.d.five;
          break;
        case '6':
          slot = grid.d.six;
          break;
        case '7':
          slot = grid.d.seven;
          break;
        case '8':
          slot = grid.d.eight;
          break;
        case '9':
          slot = grid.d.nine;
          break;
        }
        case 'e':
        switch(num)
        {
          case '1':
            slot = grid.e.one;
            break;
          case '2':
            slot = grid.e.two;
            break;
          case '3':
            slot = grid.e.three;
            break;
          case '4':
            slot = grid.e.four;
            break;
          case '5':
            slot = grid.e.five;
            break;
          case '6':
            slot = grid.e.six;
            break;
          case '7':
            slot = grid.e.seven;
            break;
          case '8':
            slot = grid.e.eight;
            break;
          case '9':
            slot = grid.e.nine;
            break;
          }
          case 'f':
          switch(num)
          {
            case '1':
              slot = grid.f.one;
              break;
            case '2':
              slot = grid.f.two;
              break;
            case '3':
              slot = grid.f.three;
              break;
            case '4':
              slot = grid.f.four;
              break;
            case '5':
              slot = grid.f.five;
              break;
            case '6':
              slot = grid.f.six;
              break;
            case '7':
              slot = grid.f.seven;
              break;
            case '8':
              slot = grid.f.eight;
              break;
            case '9':
              slot = grid.f.nine;
              break;
            }
          }



          if(slot.part == selectorGrid.active)
          {
              return;
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
