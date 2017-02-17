/*jshint esversion: 6 */
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

  constructor(part)
  {

    this.part = part;

  }



}
