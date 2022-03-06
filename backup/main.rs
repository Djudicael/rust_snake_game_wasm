// use snake_game::Person;
// use snake_game::Animal;
// use snake_game::PersonId;
// use snake_game::log_info;
// use snake_game::log_info_2;

// use snake_game::*;
use snake_game::learning_rust::PersonId;
use snake_game::learning_rust::{Log, Person};

fn main() {
    let person = Person::new();

    println!("{}", person.id);
    // println!("{}", person.name());
}
