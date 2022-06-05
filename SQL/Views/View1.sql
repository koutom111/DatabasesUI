CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `ProjectResearch` AS
    SELECT 
        CONCAT(`c`.`First_Name`, ' ', `c`.`Last_Name`) AS `Researcher_Name`,
        `a`.`Project_Title` AS `Project_Title`,
        CONCAT(`r`.`First_Name`, ' ', `r`.`Last_Name`) AS `ScientificManager_Name`,
        CONCAT(`p`.`First_Name`, ' ', `p`.`Last_Name`) AS `Evaluator_Name`
    FROM
        (((((`Project` `a`
        JOIN `Researcher` `r` ON ((`r`.`Researcher_ID` = `a`.`Researcher_ID`)))
        JOIN `Works_On` `w` ON ((`w`.`Project_Title` = `a`.`Project_Title`)))
        JOIN `Researcher` `c` ON ((`c`.`Researcher_ID` = `w`.`Researcher_ID`)))
        JOIN `Evaluation` `e` ON ((`e`.`Project_Title` = `a`.`Project_Title`)))
        JOIN `Researcher` `p` ON ((`p`.`Researcher_ID` = `e`.`Researcher_ID`)))
    WHERE
        ((`p`.`Researcher_ID` <> `c`.`Researcher_ID`)
            AND (`p`.`Researcher_ID` <> `r`.`Researcher_ID`))
    ORDER BY CONCAT(`c`.`First_Name`, ' ', `c`.`Last_Name`)