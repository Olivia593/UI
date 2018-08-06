public class Elevator
 {
	private int location;

	public Elevator(){
	location = 1;
	}

	public int whatFloor(){
	return(location);
	}

	public void moveMe(){
	if (location == 1)
		location = 2;
	else 
		location = 1;
	}
 }

 public class Person
 {
	private int location;

	public Person(){
	location = 1;
	}

	public Person(int x){
	location = x;
	}

	public int whatFloor(){
	return(location);
	}

	public void getOnElevator(){
	location = 0;
	}

	public void getOffElevator( int elevatorLocationX ){
	location = elevatorLocationX;
	}
 }

 public class Spike2
 {
	public static void main(String[] args){
	Person person1 = new Person();
	Person person2 = new Person(2);
	Elevator elevator1 = new Elevator();


	person1.getOnElevator();
	elevator1.moveMe();
	person2.getOnElevator(); 
	person1.getOffElevator(elevator1.whatFloor());
	elevator1.moveMe();
	person2.getOffElevator(elevator1.whatFloor());
	}
 }