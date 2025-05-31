package Classes;

public class Main {
    public  static void main(String [] databases){
//        System.out.println("This is main");
//        for(int i=0;i<databases.length;i++){
//            System.out.println(databases[i]);
//        }
//       int number=10;
//       System.out.println(number);
//       String name =  "Nishan";
//
//       System.out.println(name);
//        String name2="Nishan";
//        System.out.println(name2);

//        String name=new String("Nishan");
//        System.out.println(name);
//        String name2=new String("Nishan");
//        System.out.println(name2);
//        int arr[]=new int[2];
//        arr[0]=1;
//        arr[1]=2;
//        System.out.println(arr[0]);
//        System.out.println(arr[1]);
//
//        String nameArr[]=new String[2];
//        nameArr[0]="Nishan1";
//        nameArr[1]="Nishan2";
//        System.out.println(nameArr[0]);
//        System.out.println(nameArr[1]);

//        name, age

//        String name[]=new String[2];
//        int age[]=new int[2];

//        5000

//        name[0]="Nishan";
//        name[1]="Joy";
//        age[0]=22;
//        age[1]=23;

        //5000
//        "Joy"
//        24

//        for(int i=0;i<name.length;i++){
//            System.out.print("My name is "+name[i]+ " ");
//            System.out.println("and my age is "+age[i]);
//            if(name[i].equals("Joy")){
//                age[i]+=1;
//            }
//
//        Student Nishan=new Student("Nishan",22);
//
//        Student hero=Nishan;
//        System.out.println(hero.name);
//        Nishan.age=24;
//        System.out.println(Nishan.age);
//        System.out.println(hero.age);
//        hero.age=25;
//        System.out.println(Nishan.age);
//        System.out.println(hero.age);
//        Student Joy=new Student("Joy",23);
//        Student.printTotalStudent();
//         Student.printName();
//        Nishan.printName();
//        Joy.printName();
//        Nishan.printName();

//        Nishan.printName();
//        System.out.println(Nishan.name);
//        System.out.println(Nishan.age);

//        Student Hari=new Student("Hari",24);
//        Nishan.printCollegeName();
//        Joy.printCollegeName();
//        Hari.printCollegeName();
//        Student.printTotalStudent();


//        Nishan.printName();
//        Joy.printName();

//
//         Nishan.printTotalStudent();
//         Joy.printTotalStudent();
//         Student.printTotalStudent();
//         Nishan.printName();
//        Student Hari=new Student("hari", 24);
//        Nishan.printName();
//        System.out.println(Nishan.name);
//        System.out.println(Joy.name);
//        Joy.printName();
//        System.out.println(Joy.name);
//        System.out.println(Joy.age);
//        Joy.printName();
//        Joy.printNameWrapper();

//        Nishan.printTotalStudentCount();

        //Constructor
//        Constructor is a special method that is used to initialize the object.
        // Constructor name == Class Name
        // First Method that is called while creating an object.


//        Phone nishan=new Phone("One Plus",100);
//        nishan.printHealth();
//        Phone hari=nishan;
//        hari.printHealth();
//        hari.drop();
//        nishan.printHealth();
//        hari.printHealth();

    }

}

//this keyword is the reference to the current object/instance.

//Class
class Student{
    String name;
    int age;

    static int totalCount; //Class Variable
    //Class Method
    static String collegeName="Hero College";

    public static  void printCollegeName(){
        System.out.println(Student.collegeName);
    }
    public static void printTotalStudent(){
        System.out.println(Student.totalCount);
    }

    public Student(String name, int age){
        this.name=name;
        this.age=age;
        Student.totalCount++;
    }

    public void printName(){
        System.out.println(this.name);
    }


    public  void printNameWrapper(){
        this.printName();
    }
}

class Phone{
    int health;
    String name;

    public Phone(String name,int health){
        this.health=health;
        this.name=name;
    }

    public void drop(){
        this.health-=20;
    }

    public  void printHealth(){
        System.out.println("Health: "+this.health);
    }
}


