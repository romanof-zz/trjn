Dir[File.dirname(__FILE__) + '/../models/*.rb'].each {|f| require f}

me = User.where(name: 'romanof').first_or_create

ecuador = Journey.where(
  title: "Ecuador 2015",
  people_count: 3,
  budget: 500,
  budget_min: 300,
  budget_max: 700,
  duration: 14,
  description: "<p> That was one of the most extereme and exciting adventures of all time for me. Including old city exploration, exteded trekking, concuring the highest peak, I've even been to! And on top of that surfing and chilling in a surfer village!</p>",
  location: '-0.900842,-79.804687',
  author_id: me.id
).first_or_create

quito = Milestone.where(
  name: 'Quito',
  location: '-0.1806532,-78.4678382',
  journey_id: ecuador.id,
  duration: 2,
  position: 1,
  description: 'Quito Story TBD'
).first_or_create

quilotoa = Milestone.where(
  name: 'Sigchos - Quilotoa Lake',
  location: '-0.77966191,-78.90604019',
  journey_id: ecuador.id,
  duration: 5,
  position: 2,
  description: 'Sigchos - Quilotoa Lake Story TBD'
).first_or_create

chimborazo = Milestone.where(
  name: 'Chimborazo',
  location: '-1.4693018,-78.8169396',
  journey_id: ecuador.id,
  duration: 2,
  position: 3,
  description: 'Chimborazo Story TBD'
).first_or_create

montanita = Milestone.where(
  name: 'Montañita',
  location: '-1.8268465,-80.7529731',
  journey_id: ecuador.id,
  duration: 4,
  position: 4,
  description: 'Montañita Story TBD'
).first_or_create

guayaquil = Milestone.where(
  name: 'Guayaquil',
  location: '-2.1709979,-79.9223592',
  journey_id: ecuador.id,
  duration: 1,
  position: 5,
  description: 'Guayaquil Story TBD'
).first_or_create

Transit.where(
 transit_type: 1,
 journey_id: ecuador.id,
 start_milestone_id: quito.id,
 end_milestone_id: quilotoa.id,
 price: 10,
 description: "Took a bus from Quito to Latacunga for about 6$ and then from Latacunga to Sigchos for another 4$. Total time = 8h."
).first_or_create

Transit.where(
 transit_type: 2,
 journey_id: ecuador.id,
 start_milestone_id: quilotoa.id,
 end_milestone_id: chimborazo.id,
 price: 40,
 description: "Since we arranged guides in Latacunga, they also offered us a car rental from Latacunga to Chimborazo, and back to Quito after the climb for 100$. Bus from Quilotoa back to Latacunga was 6$."
).first_or_create

Transit.where(
 transit_type: 3,
 journey_id: ecuador.id,
 start_milestone_id: chimborazo.id,
 end_milestone_id: montanita.id,
 price: 136,
 description: "After getting back to Quito's airport on the car, we hop on the plain to Guayaquil (116$). And from there took a bus to Montanita for another 20$."
).first_or_create

Transit.where(
 transit_type: 2,
 journey_id: ecuador.id,
 start_milestone_id: montanita.id,
 end_milestone_id: guayaquil.id,
 price: 25,
 description: "From Montanita we hired a taxi for 80$, cause there were no bus tickets (better book in advance)! Even though the price ended up relativelly similar to the bus fare."
).first_or_create
