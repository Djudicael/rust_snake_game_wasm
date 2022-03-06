mod another_lib;
use another_lib::another_mod;

fn outsider() {
    another_mod::another_fn();
    println!("outsider fn");
}

pub mod learning_rust {

    use std::fmt;

    mod top_level {
        pub fn hi_there() {
            println!("hi there");
        }

        pub mod low_level {
            pub fn hello_world() {
                println!("hello world");
            }
        }
    }

    pub trait Log {
        fn display_info(&self);
        fn alert(&self) {
            println!("Default implementation");
        }
    }

    pub enum PersonId {
        Passport(u32),
        IdentityCard(u32, u32, u32),
    }

    impl fmt::Display for PersonId {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                PersonId::Passport(x) => {
                    write!(f, "{}", x)
                }
                &PersonId::IdentityCard(x, y, z) => {
                    write!(f, "{} {} {}", x, y, z)
                }
            }
        }
    }

    // struct Animal(String, u32, String);
    pub struct Animal(pub String);

    impl Log for Animal {
        fn display_info(&self) {
            println!("{}", self.0);
        }
    }

    pub struct Person {
        name: String,
        last_name: String,
        age: u32,
        pub id: PersonId,
    }

    impl Log for Person {
        fn display_info(&self) {
            // crate::outsider();

            super::outsider();

            println!("{} {} {}", self.name, self.last_name, self.age);
        }
    }

    impl Person {
        pub fn new() -> Person {
            Person {
                name: "Default".to_string(),
                last_name: "Default".to_string(),
                age: 0,
                id: PersonId::IdentityCard(3222, 54, 87),
            }
        }

        pub fn name(&self) -> &String {
            &self.name
        }

        pub fn from(name: String, last_name: String, age: u32, id: PersonId) -> Person {
            Person {
                name,
                last_name,
                age,
                id,
            }
        }
        // associated function
        pub fn some_function() {
            println!("some function");
        }

        pub fn change_age(&mut self, new_age: u32) {
            self.age = new_age;
        }
    }

    // fn check_person_id(id: PersonId) -> String {
    //     match id {
    //         PersonId::IdentityCard(x) => x,
    //         PersonId::Passport(y) => y,
    //     }
    // }

    pub fn log_info(val: impl Log) {
        val.alert();
    }

    pub fn log_info_2(val: &dyn Log) {
        val.alert();
    }
}
