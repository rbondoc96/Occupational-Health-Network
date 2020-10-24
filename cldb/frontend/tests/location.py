# pylint: disable=import-error
# pylint: disable=anomalous-backslash-in-string

from unittest import TestCase, skip

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

import time
from random import randint

from faker import Faker

class Location(TestCase):
    def setUp(self):
        self.fake = Faker()
        self.CHROME_PATH = "C:\Program Files (x86)\chromedriver.exe"
        self.chrome_options = ChromeOptions()
        headless = False

        # log-level: Sets minimum level
        # 0: Info 
        # 1: Warning
        # 2: Error
        # 3: Fatal
        self.chrome_options.add_argument("--log-level=0")

        if headless:
            self.chrome_options.add_argument("--headless")

        self.driver = webdriver.Chrome(
            chrome_options=self.chrome_options,
            executable_path=self.CHROME_PATH,
        )

        self.login()

    def login(self):
        self.driver.get("http://127.0.0.1:8000/login")

        username = self.driver.find_element_by_name("username")
        password = self.driver.find_element_by_name("password")
        button = self.driver.find_element_by_css_selector("form button")

        username.send_keys("admin")
        password.send_keys("@BluePenguin1")
        button.click()

        time.sleep(1.2)

    @skip
    def test_create(self):

        self.driver.get("http://127.0.0.1:8000/add")
        # Main Form Inputs
        self.driver.implicitly_wait(3)
        category = Select(
            self.driver.find_element_by_name("location_category"))
        name = self.driver.find_element_by_name("name")
        branch_name = self.driver.find_element_by_name("branch_name")
        street_1 = self.driver.find_element_by_name("street_line_1")
        street_2 = self.driver.find_element_by_name("street_line_2")
        city = self.driver.find_element_by_name("city")
        state = Select(self.driver.find_element_by_name("state"))
        zipcode = self.driver.find_element_by_name("zipcode")
        phone = self.driver.find_element_by_name("phone")
        fax = self.driver.find_element_by_name("fax")
        is_callable = self.driver.find_element_by_name("is_phone_callable")
        website = self.driver.find_element_by_name("website")
        services = self.driver.find_elements_by_name("service_list")
        payments = self.driver.find_elements_by_name("auth_method_list")
        submit = self.driver.find_element_by_css_selector(
            ".submit button"
        )

        # Business Hours Subform Inputs
        bh_day = Select(self.driver.find_element_by_id("businessHour-day"))
        bh_start_time = self.driver.find_element_by_id(
            "businessHour-startTime")
        bh_end_time = self.driver.find_element_by_id("businessHour-endTime")
        bh_button = self.driver.find_element_by_css_selector(
            ".bh-subform .subform button"
        )

        # Service Hours Subform Inputs
        sh_service = Select(self.driver.find_element_by_id(
            "serviceHour-name"))
        sh_start_time = self.driver.find_element_by_id(
            "serviceHour-startTime")
        sh_end_time = self.driver.find_element_by_id("serviceHour-endTime")
        sh_days = self.driver.find_elements_by_css_selector(
            "#serviceHour-days > .checkboxInput")
        sh_button = self.driver.find_element_by_css_selector(
            ".sh-subform .subform button"
        )            

        # Contacts Subform Inputs
        c_name = self.driver.find_element_by_id("contact-name")
        c_title = self.driver.find_element_by_id("contact-title")
        c_phone = self.driver.find_element_by_id("contact-phone")
        c_email = self.driver.find_element_by_id("contact-email")
        c_button = self.driver.find_element_by_css_selector(
            ".c-subform .subform button"
        )

        category.select_by_visible_text("Urgent Care")
        name.send_keys("ABC Urgent Care")
        branch_name.send_keys(self.fake.name())
        street_1.send_keys(self.fake.street_address())
        street_2.send_keys(f"Suite {self.fake.building_number()}")
        city.send_keys("Blue Wood")
        state.select_by_value("CA")
        zipcode.send_keys("13568")
        phone.send_keys("(123) 234-3234 ext. 0")
        fax.send_keys("(123) 234-3235")
        is_callable.click()
        website.send_keys("https://google.com")

        for service in services:
            will_click = randint(0, 1)
            
            if will_click:
                service.click()

        for payment in payments:
            will_click = randint(0, 1)
            
            if will_click:
                payment.click()                
        

        bh_day.select_by_visible_text("Monday")
        bh_start_time.click()
        time.sleep(0.3)
        bh_start_time.send_keys("800a")
        bh_end_time.click()
        time.sleep(0.3)
        bh_end_time.send_keys("500p")
        bh_button.click()
        bh_day.select_by_visible_text("Tuesday")
        bh_button.click()
        bh_day.select_by_visible_text("Wednesday")
        bh_button.click()

        sh_service.select_by_visible_text("TB Screening")
        sh_start_time.click()
        time.sleep(0.3)
        sh_start_time.send_keys("800a")
        sh_end_time.click()
        time.sleep(0.3)
        sh_end_time.send_keys("500p")

        for day in sh_days:
            will_click = randint(0, 1)
            if will_click:
                day.click()

        time.sleep(0.3)
        sh_button.click()

        c_name.send_keys(self.fake.name())
        c_title.send_keys("Actress")
        c_phone.send_keys("(331) 134-2343")
        c_email.send_keys("cdiaz@icloud.com")
        c_button.click()

        submit.click()
        print("waiting")
        time.sleep(20)

    def test_update(self):
        self.driver.get(
        "http://127.0.0.1:8000/location/abc-urgent-care-carmen-stone/")

        time.sleep(0.5)
        update_button = self.driver.find_element_by_id("edit-button")
        update_button.click()
        time.sleep(0.5) 

        # Business Hours Subform Inputs
        bh_day = Select(self.driver.find_element_by_id("businessHour-day"))
        bh_start_time = self.driver.find_element_by_id(
            "businessHour-startTime")
        bh_end_time = self.driver.find_element_by_id("businessHour-endTime")
        bh_button = self.driver.find_element_by_css_selector(
            ".bh-subform .subform button"
        )

        bh_day.select_by_visible_text("Thursday")
        bh_start_time.click()
        time.sleep(0.3)
        bh_start_time.send_keys("800a")
        bh_end_time.click()
        time.sleep(0.3)
        bh_end_time.send_keys("500p")
        bh_button.click()
        bh_day.select_by_visible_text("Friday")
        bh_button.click()        

        # Service Hours Subform Inputs
        sh_service = Select(self.driver.find_element_by_id(
            "serviceHour-name"))
        sh_start_time = self.driver.find_element_by_id(
            "serviceHour-startTime")
        sh_end_time = self.driver.find_element_by_id("serviceHour-endTime")
        sh_days = self.driver.find_elements_by_css_selector(
            "#serviceHour-days > .checkboxInput")
        sh_button = self.driver.find_element_by_css_selector(
            ".sh-subform .subform button"
        )       

        sh_service.select_by_visible_text("STI Testing")
        sh_start_time.click()
        time.sleep(0.3)
        sh_start_time.send_keys("800a")
        sh_end_time.click()
        time.sleep(0.3)
        sh_end_time.send_keys("500p")

        for day in sh_days:
            will_click = randint(0, 1)
            if will_click:
                day.click()
        
        time.sleep(3)
        sh_button.click()    
        time.sleep(3)        

        # Contacts Subform Inputs
        c_name = self.driver.find_element_by_id("contact-name")
        c_title = self.driver.find_element_by_id("contact-title")
        c_phone = self.driver.find_element_by_id("contact-phone")
        c_email = self.driver.find_element_by_id("contact-email")
        c_button = self.driver.find_element_by_css_selector(
            ".c-subform .subform button"
        )                                     

        time.sleep(0.3)
        # wait = WebDriverWait(self.driver, 5)
        # c_name = wait.until(EC.element_located_to_be_selected(
        #     (By.ID, "contact-name")
        # ))
        c_name = self.driver.find_element_by_id("contact-name")
        c_name.send_keys(self.fake.name())
        c_title.send_keys("Actress")
        c_phone.send_keys("(331) 134-2343")
        c_email.send_keys("cdiaz@icloud.com")
        c_button.click()                      

        self.driver.implicitly_wait(3)
        submit = self.driver.find_element_by_css_selector(
            ".submit button"
        )              

        submit.click()     

        time.sleep(120)   

    def tearDown(self):
        self.driver.quit()