BEGIN;

TRUNCATE
  enroot_plants,
  enroot_tasks,
  enroot_users
  RESTART IDENTITY CASCADE;

INSERT INTO enroot_users (first_name, last_name, username, password)
VALUES
  ('Leila', 'Anderson', 'leilaanderson', '$2a$12$4YGQ8fc0mlt8AuqfYsXQQudNHem5XkTkkla7HS/ndON8zhVAnNOXy'),
  ('Test', 'User', 'testuser', '$2a$12$NdEBKoQWSW1sf.VFMjsQ1.c8KzU1VgSTezrsb4f498TRoDs8NVuLm');

INSERT INTO enroot_plants (scientific_name, common_name, lifespan, growth_rate, growth_period, temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, moisture_use, user_id, seedling_vigor, flower_color, foliage_color)  
VALUES
    ('Phyllostegia parviflora (Gaudich.) Benth.', 'Smallflower Phyllostegia', 'pulvinar', 'nunc viverra', 'sed magna', 40, 'ut at', 4, 18, 'quis', 'aliquet ultrices', 'ac', 'tellus', 301, 'nunc', 2, 'sed vestibulum', 'Maroon', 'Pink'),
    ('Astragalus pardalinus (Rydb.) Barneby', 'Panther Milkvetch', 'adipiscing elit', 'congue', 'vel ipsum', 39, 'ante', 3, 38, 'erat', 'quam', 'nullam', 'ultricies', 79, 'aliquam lacus', 1, 'adipiscing elit', 'Indigo', 'Puce'),
    ('Draba cinerea M.F. Adams', 'Grayleaf Draba', 'pede posuere', 'proin interdum', 'ante vel', 14, 'porttitor lacus', 1, 11, 'amet', 'nec sem', 'dapibus at', 'ligula', 362, 'tincidunt eget', 2, 'eget', 'Pink', 'Goldenrod'),
    ('Festuca heterophylla Lam.', 'Variousleaf Fescue', 'neque', 'volutpat', 'vel lectus', 36, 'sagittis', 5, 29, 'nibh', 'morbi vel', 'in', 'ligula', 29, 'sit', 2, 'ipsum dolor', 'Red', 'Aquamarine'),
    ('Bacidia scopulicola (Nyl.) A.L. Sm.', 'Dotted Lichen', 'vel enim', 'tempor', 'at', 23, 'sagittis dui', 2, 46, 'dui maecenas', 'libero nullam', 'sem', 'nunc nisl', 107, 'vitae', 2, 'amet', 'Red', 'Khaki'),
    ('Aquilegia desolatica S.L. Welsh & N.D. Atwood', 'Desolation Columbine', 'curae nulla', 'integer tincidunt', 'iaculis congue', 17, 'vel', 3, 36, 'blandit', 'in', 'etiam pretium', 'donec', 297, 'id ligula', 2, 'lucus', 'Teal', 'Violet'),
    ('Symphyotrichum puniceum (L.) Á. Löve & D. Löve var. scabricaule (Shinners) G.L. Nesom', 'Purplestem Aster', 'morbi non', 'eget', 'diam', 37, 'proin interdum', 4, 24, 'blandit', 'vestibulum', 'augue', 'non sodales', 282, 'convallis nunc', 1, 'nulla ac', 'Pink', 'Indigo'),
    ('Sclerochloa dura (L.) P. Beauv.', 'Common Hardgrass', 'curae nulla', 'interdum eu', 'morbi', 45, 'felis sed', 4, 20, 'ultrices vel', 'consequat lectus', 'ut', 'turpis', 270, 'diam in', 1, 'odio', 'Red', 'Aquamarine'),
    ('Allium cernuum Roth var. neomexicanum (Rydb.) J.F. Macbr.', 'New Mexican Nodding Onion', 'ac consequat', 'etiam justo', 'pellentesque', 26, 'morbi', 5, 31, 'vel nulla', 'libero nullam', 'nibh', 'in faucibus', 335, 'integer ac', 2, 'consecteteur', 'Yellow', 'Yellow'),
    ('Collema undulatum Laurer ex Flotow', 'Undulate Jelly Lichen', 'aliquam non', 'turpis', 'auctor', 1, 'in', 3, 15, 'sapien', 'nibh in', 'amet', 'tellus semper', 11, 'libero', 2, 'consequat', 'Yellow', 'Indigo'),
    ('Apodanthera undulata A. Gray', 'Melon Loco', 'nulla eget', 'dis parturient', 'mattis', 6, 'platea', 2, 19, 'ridiculus', 'donec ut', 'consectetuer eget', 'felis', 350, 'condimentum curabitur', 2, 'eu', 'Blue', 'Goldenrod'),
    ('Arthropodium cirrhatum (G. Forst.) R. Br.', 'Rock-lily', 'venenatis tristique', 'ac', 'cum sociis', 48, 'molestie sed', 1, 33, 'curabitur', 'pellentesque', 'magnis', 'vestibulum velit', 102, 'venenatis tristique', 1, 'lacinia', 'Mauv', 'Turquoise'),
    ('Galactia microphylla (Chapm.) H.J. Rogers', 'Littleleaf Milkpea', 'vestibulum', 'vulputate elementum', 'quis libero', 19, 'volutpat', 5, 15, 'volutpat in', 'consequat', 'ante nulla', 'nibh', 271, 'consectetuer', 1, 'voluptat dui', 'Green', 'Green'),
    ('Enceliopsis covillei (A. Nelson) S.F. Blake', 'Panamint Daisy', 'potenti cras', 'nisi', 'amet', 5, 'sit', 4, 32, 'lorem quisque', 'eu massa', 'sed', 'convallis nulla', 84, 'tempus vel', 1, 'risus', 'Orange', 'Violet'),
    ('Pyrenopsis compacta Willey', 'Compact Pyrenopsis Lichen', 'in', 'pellentesque viverra', 'sit', 35, 'sem fusce', 3, 1, 'quis', 'elementum', 'ut volutpat', 'molestie', 63, 'nibh fusce', 2, 'orci', 'Teal', 'Purple'),
    ('Setaria arizonica Rominger', 'Arizona Bristlegrass', 'vel', 'interdum in', 'dolor', 14, 'id', 2, 36, 'vel', 'vestibulum ac', 'pulvinar', 'proin risus', 314, 'rhoncus mauris', 1, 'rhoncus', 'Purple', 'Orange'),
    ('Lathyrus L.', 'Pea', 'tortor sollicitudin', 'fusce congue', 'faucibus orci', 36, 'phasellus in', 1, 32, 'orci', 'lectus pellentesque', 'congue elementum', 'quis augue', 337, 'cubilia curae', 1, 'pharetra', 'Purple', 'Yellow'),
    ('Crocidium Hook.', 'Spring-gold', 'nulla', 'est', 'sit amet', 25, 'lacinia eget', 1, 13, 'ut massa', 'sapien arcu', 'in', 'pellentesque', 40, 'nulla ultrices', 1, 'neque', 'Puce', 'Crimson'),
    ('Physaria floribunda Rydb. var. osterhoutii (Payson) Rollins', 'Pointtip Twinpod', 'pulvinar sed', 'convallis tortor', 'at nulla', 7, 'velit', 4, 25, 'molestie', 'ante', 'rutrum neque', 'in', 306, 'ultrices aliquet', 1, 'sapien', 'Puce', 'Orange'),
    ('Scleropodium julaceum E. Lawton', 'Scleropodium Moss', 'etiam', 'feugiat', 'at velit', 6, 'nunc', 1, 16, 'placerat', 'platea', 'pellentesque', 'nec nisi', 28, 'nulla tempus', 2, 'odio', 'Red', 'Blue');


INSERT INTO enroot_tasks (plant_id, user_id, maintenance_needed, frequency, details) 
VALUES
    (9, 2, 'fusce consequat nulla nisl nunc nisl', 'tincidunt eget', 'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum'),
    (17, 1, 'pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia', 'mauris morbi', 'pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie'),
    (2, 1, 'sodales sed', 'felis fusce posuere', 'quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla'),
    (17, 1, 'condimentum curabitur in libero ut massa volutpat convallis morbi', 'ut nulla', 'at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue'),
    (18, 1, 'molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et', 'lectus suspendisse', 'vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget'),
    (3, 2, 'nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi', 'ultrices', 'tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis'),
    (9, 2, 'vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis', 'hac habitasse', 'volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla'),
    (12, 1, 'in tempor turpis nec', 'in hac habitasse', 'nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede'),
    (20, 1, 'orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat', 'vel pede morbi', 'etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam'),
    (18, 2, 'porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet', 'pede', 'penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien'),
    (18, 2, 'nisi venenatis', 'ligula sit', 'phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla'),
    (18, 2, 'pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate', 'lacinia aenean', 'risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante'),
    (8, 2, 'risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis', 'fusce consequat', 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non'),
    (13, 2, 'dolor morbi vel lectus in quam fringilla', 'justo aliquam', 'amet eros suspendisse accumsan tortor quis turpis sed ante vivamus'),
    (2, 2, 'ac consequat metus sapien ut nunc', 'ligula nec sem', 'sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla'),
    (15, 2, 'praesent id massa id', 'dolor', 'rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis'),
    (15, 2, 'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis', 'sit amet cursus', 'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam'),
    (13, 1, 'feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare', 'auctor gravida', 'luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non'),
    (2, 1, 'mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst', 'sapien placerat ante', 'orci pede venenatis non sodales sed tincidunt eu felis fusce'),
    (8, 2, 'lacinia nisi venenatis', 'accumsan felis ut', 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum'),
    (4, 2, 'nec', 'donec', 'ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum'),
    (8, 2, 'sit amet eleifend pede libero quis orci', 'duis mattis', 'sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis'),
    (19, 1, 'elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue', 'platea', 'morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet'),
    (6, 2, 'elit proin risus praesent', 'ut erat curabitur', 'nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id'),
    (4, 2, 'pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla', 'erat nulla', 'sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis'),
    (14, 1, 'donec diam neque vestibulum eget', 'lobortis sapien sapien', 'vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in'),
    (3, 1, 'vulputate elementum nullam varius nulla facilisi cras non velit nec', 'rhoncus', 'tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in'),
    (7, 2, 'sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis', 'ac', 'in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie'),
    (5, 1, 'suscipit ligula in lacus curabitur at ipsum ac', 'convallis morbi odio', 'felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed'),
    (3, 1, 'in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet', 'mattis', 'a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus'),
    (2, 2, 'porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis', 'nibh', 'bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor'),
    (18, 2, 'at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate', 'pretium', 'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis'),
    (6, 1, 'dolor morbi vel lectus in quam fringilla rhoncus mauris enim', 'nisl nunc nisl', 'donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam'),
    (8, 1, 'sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum', 'in faucibus orci', 'id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet'),
    (17, 2, 'cras pellentesque volutpat', 'porttitor', 'justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut'),
    (2, 1, 'ut blandit non interdum in ante vestibulum ante ipsum', 'varius nulla', 'venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum'),
    (6, 2, 'pede posuere nonummy integer non velit donec diam neque', 'lacinia sapien', 'justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi'),
    (6, 1, 'morbi odio odio elementum eu', 'nunc commodo', 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae'),
    (4, 1, 'donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus', 'vivamus vel nulla', 'ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam'),
    (12, 2, 'diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum', 'id pretium', 'purus phasellus in felis donec semper sapien a libero nam'),
    (9, 1, 'at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede', 'maecenas', 'cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae'),
    (11, 1, 'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus', 'nibh', 'turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan'),
    (3, 2, 'augue luctus', 'est', 'nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat'),
    (12, 2, 'orci nullam molestie nibh in lectus pellentesque at nulla suspendisse', 'rutrum nulla', 'congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec'),
    (19, 2, 'tellus', 'velit donec diam', 'eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient'),
    (15, 1, 'id turpis', 'cubilia curae', 'vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus'),
    (6, 1, 'ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at', 'ipsum', 'augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam'),
    (19, 1, 'diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque', 'pharetra magna', 'viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere'),
    (13, 1, 'faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio', 'mauris', 'nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare'),
    (5, 2, 'odio condimentum id', 'vestibulum', 'at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio');


COMMIT;
