package vv.com.auth.model;


import javax.persistence.*;

@Entity
@Table(name = "hero")
public class Hero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String maritalStatus;
    private String address;
    private String placeOfBirth;
    private String occupation;
    private String dateOfDeath;
    private String reaasonOfDeath;
    private String dateOfInjuiry;
    private String description;
    private String imgUrl;

    public Hero() {
    }

    public Hero(String imgUrl,String firstName, String lastName, String dateOfBirth, String maritalStatus, String address, String placeOfBirth, String occupation, String dateOfDeath, String reaasonOfDeath, String dateOfInjuiry, String description) {
        this.imgUrl=imgUrl;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.maritalStatus = maritalStatus;
        this.address = address;
        this.placeOfBirth = placeOfBirth;
        this.occupation = occupation;
        this.dateOfDeath = dateOfDeath;
        this.reaasonOfDeath = reaasonOfDeath;
        this.dateOfInjuiry = dateOfInjuiry;
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getDateOfDeath() {
        return dateOfDeath;
    }

    public void setDateOfDeath(String dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public String getReaasonOfDeath() {
        return reaasonOfDeath;
    }

    public void setReaasonOfDeath(String reaasonOfDeath) {
        this.reaasonOfDeath = reaasonOfDeath;
    }

    public String getDateOfInjuiry() {
        return dateOfInjuiry;
    }

    public void setDateOfInjuiry(String dateOfInjuiry) {
        this.dateOfInjuiry = dateOfInjuiry;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
