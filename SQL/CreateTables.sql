DROP TABLE IF EXISTS `Researcher`;

CREATE TABLE `Researcher` (
  `Researcher_ID` bigint(20) NOT NULL,
  `First_Name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Last_Name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Sex` enum('M','F') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Dateof_Birth` date DEFAULT NULL,
  `Age` int(11) GENERATED ALWAYS AS (2022 - to_days(`Dateof_Birth`) / 365.25) VIRTUAL,
  PRIMARY KEY (`Researcher_ID`),
  UNIQUE KEY `Researcher_ID_UNIQUE` (`Researcher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Executive`;

CREATE TABLE `Executive` (
  `Executive_ID` bigint(20) NOT NULL,
  `First_Name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Last_Name` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Dateof_Birth` date DEFAULT NULL,
  PRIMARY KEY (`Executive_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `	Organization`;

CREATE TABLE `Organization` (
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Abbrevation` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Street` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Town` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Number` int(11) DEFAULT NULL,
  `Postal_Code` int(11) DEFAULT NULL,
  PRIMARY KEY (`Organization_Name`),
  UNIQUE KEY `Organization_Name_UNIQUE` (`Organization_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Program`;

CREATE TABLE `Program` (
  `Program_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Description` mediumtext COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Department` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Program_Title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Research_Centre`;

CREATE TABLE `Research_Centre` (
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Budgetfrom_Ministry` bigint(20) DEFAULT NULL,
  `Budgetfrom_Activities` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Organization_Name`),
  CONSTRAINT `fk3_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Corporation`;

CREATE TABLE `Corporation` (
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Equity` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Organization_Name`),
  CONSTRAINT `fk8_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `University`;

CREATE TABLE `University` (
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Budgetof_Ministry` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Organization_Name`),
  UNIQUE KEY `Organization_Name_UNIQUE` (`Organization_Name`),
  CONSTRAINT `fk_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Phone`;

CREATE TABLE `Phone` (
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Phone_Number` bigint(20) NOT NULL,
  PRIMARY KEY (`Organization_Name`,`Phone_Number`),
  KEY `fk4_Organization_Name_idx` (`Organization_Name`),
  CONSTRAINT `fk4_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Project`;

CREATE TABLE `Project` (
  `Project_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Summary` mediumtext COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Grant` double DEFAULT NULL,
  `Starting_Date` date DEFAULT NULL,
  `Due_Date` date DEFAULT NULL,
  `Program_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Executive_ID` bigint(20) NOT NULL,
  `Researcher_ID` bigint(20) NOT NULL,
  `Duration` bigint(20) GENERATED ALWAYS AS (to_days(`Due_Date`) - to_days(`Starting_Date`)) VIRTUAL,
  PRIMARY KEY (`Project_Title`),
  UNIQUE KEY `Project_Title_UNIQUE` (`Project_Title`),
  KEY `fk4_Program_Title_idx` (`Program_Title`),
  KEY `fk5_Organization_Name_idx` (`Organization_Name`),
  KEY `fk5_Executive_ID_idx` (`Executive_ID`),
  KEY `fk10_Researcher_ID_idx` (`Researcher_ID`),
  KEY `fk11_Researcher_ID_idx` (`Researcher_ID`),
  CONSTRAINT `fk11_Researcher_ID` FOREIGN KEY (`Researcher_ID`) REFERENCES `Researcher` (`Researcher_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk4_Program_Title` FOREIGN KEY (`Program_Title`) REFERENCES `Program` (`Program_Title`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk5_Executive_ID` FOREIGN KEY (`Executive_ID`) REFERENCES `Executive` (`Executive_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk5_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Deliverable`;

CREATE TABLE `Deliverable` (
  `Deliverable_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Project_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Summary` mediumtext COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Due_Date` date DEFAULT NULL,
  PRIMARY KEY (`Deliverable_Title`),
  KEY `fk1_Project_Title_idx` (`Project_Title`),
  CONSTRAINT `fk_Project_Title` FOREIGN KEY (`Project_Title`) REFERENCES `Project` (`Project_Title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Evaluation`;

CREATE TABLE `Evaluation` (
  `Project_Title` varchar(45) NOT NULL,
  `Researcher_ID` bigint NOT NULL,
  `Date` date DEFAULT NULL,
  `Grade` int DEFAULT NULL,
  PRIMARY KEY (`Project_Title`,`Researcher_ID`),
  UNIQUE KEY `Project_Title_UNIQUE` (`Project_Title`),
  KEY `fk0_Researcher_ID` (`Researcher_ID`),
  CONSTRAINT `fk0_Researcher_ID` FOREIGN KEY (`Researcher_ID`) REFERENCES `Researcher` (`Researcher_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk2_Project_Title` FOREIGN KEY (`Project_Title`) REFERENCES `Project` (`Project_Title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ai_ci


DROP TABLE IF EXISTS `Field`;

CREATE TABLE `Field` (
  `Scientific_Field` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Project_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`Scientific_Field`,`Project_Title`),
  KEY `fk3_Project_Title_idx` (`Project_Title`),
  CONSTRAINT `fk3_Project_Title` FOREIGN KEY (`Project_Title`) REFERENCES `Project` (`Project_Title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Works_For`;

CREATE TABLE `Works_For` (
  `Researcher_ID` bigint(20) NOT NULL,
  `Organization_Name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Starting_Date` date DEFAULT NULL,
  PRIMARY KEY (`Researcher_ID`,`Organization_Name`),
  UNIQUE KEY `Researcher_ID_UNIQUE` (`Researcher_ID`),
  KEY `fk6_Organization_Name_idx` (`Organization_Name`),
  CONSTRAINT `fk6_Researcher_ID` FOREIGN KEY (`Researcher_ID`) REFERENCES `Researcher` (`Researcher_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk9_Organization_Name` FOREIGN KEY (`Organization_Name`) REFERENCES `Organization` (`Organization_Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `Works_On`;

CREATE TABLE `Works_On` (
  `Project_Title` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `Researcher_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`Project_Title`,`Researcher_ID`),
  KEY `fk10_Project_Title_idx` (`Project_Title`),
  KEY `fk10_Researcher_ID_idx` (`Researcher_ID`),
  CONSTRAINT `fk10_Project_Title` FOREIGN KEY (`Project_Title`) REFERENCES `Project` (`Project_Title`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk10_Researcher_ID` FOREIGN KEY (`Researcher_ID`) REFERENCES `Researcher` (`Researcher_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



