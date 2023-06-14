CREATE database nfl;

USE nfl;

CREATE TABLE teams (
    id INT auto_increment,
    location VARCHAR(255),
    mascot VARCHAR(255),
    abbreviation VARCHAR(3),
    conference ENUM('AFC', 'NFC'),
    division ENUM('North', 'South', 'East', 'West'),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(id)
);

INSERT INTO teams (
    location, mascot, abbreviation, conference, division
) VALUES ('Buffalo', 'Bills', 'BUF', 'AFC', 'East'), 
('Miami', 'Dolphins', 'MIA', 'AFC', 'East'),
('New England', 'Patriots', 'NE', 'AFC', 'East'),
('New York', 'Jets', 'NYJ', 'AFC', 'East'),
('Baltimore', 'Ravens', 'BAL', 'AFC', 'North');

INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Cincinnati', 'Bengals', 'CIN', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Cleveland', 'Browns', 'CLE', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Pittsburgh', 'Steelers', 'PIT', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Houston', 'Texans', 'HOU', 'AFC', 'South');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Indianapolis', 'Colts', 'IND', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Jacksonville', 'Jaguars', 'JAX', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Tennessee', 'Titans', 'TEN', 'AFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Denver', 'Broncos', 'DEN', 'AFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Kansas City', 'Chiefs', 'KC', 'AFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Los Angeles', 'Chargers', 'LAC', 'AFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Oakland', 'Raiders', 'OAK', 'AFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Dallas', 'Cowboys', 'DAL', 'NFC', 'East');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('New York', 'Giants', 'NYG', 'NFC', 'East');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Philadelphia', 'Eagles', 'PHI', 'NFC', 'East');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Washington', 'Redskins', 'WSH', 'NFC', 'East');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Chicago', 'Bears', 'CHI', 'NFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Detriot', 'Lions', 'DET', 'NFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Green Bay', 'Packers', 'GB', 'NFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Minnesota', 'Vikings', 'MIN', 'NFC', 'North');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Atlanta', 'Falcons', 'ATL', 'NFC', 'South');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Carolina', 'Panthers', 'CAR', 'NFC', 'South');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('New Orleans', 'Saints', 'NO', 'NFC', 'South');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Tampa Bay', 'Buccaneers', 'TB', 'NFC', 'South');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Arizona', 'Cardinals', 'ARI', 'NFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Los Angeles', 'Rams', 'LAR', 'NFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('San Francisco', '49ers', 'SF', 'NFC', 'West');
INSERT INTO teams (location, mascot, abbreviation, conference, division) VALUES ('Seattle', 'Seahawks', 'SEA', 'NFC', 'West');

CREATE USER 'k_teams_user'@'%' IDENTIFIED WITH mysql_native_password BY 'teams';

GRANT ALL ON nfl.* TO 'k_teams_user'@'%';