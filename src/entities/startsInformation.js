class StartsInformation {
  constructor({ horse, driver, number }) {
    this.startNo = number;
    this.horseFather = horse.pedigree.father.name;
    this.trainer = `${horse.trainer.firstName} ${horse.trainer.lastName}`;
    this.rider = `${driver.firstName} ${driver.lastName}`;
    this.horseName = horse.name;
  }
}
export default StartsInformation;
