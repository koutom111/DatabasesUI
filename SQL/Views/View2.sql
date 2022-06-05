CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `ProjectEvaluation` AS
    SELECT 
        `c`.`Project_Title` AS `Project_Title`,
        CONCAT(`w`.`First_Name`, ' ', `w`.`Last_Name`) AS `Evaluator_Name`,
        `r`.`Grade` AS `Grade`,
        `r`.`Date` AS `Date`,
        `c`.`Grant` AS `Grant`,
        `p`.`Program_Title` AS `Program_Title`,
        `p`.`Department` AS `Department`
    FROM
        (((`Project` `c`
        JOIN `Evaluation` `r` ON ((`r`.`Project_Title` = `c`.`Project_Title`)))
        JOIN `Researcher` `w` ON ((`w`.`Researcher_ID` = `r`.`Researcher_ID`)))
        JOIN `Program` `p` ON ((`p`.`Program_Title` = `c`.`Program_Title`)))
    ORDER BY `r`.`Grade` DESC