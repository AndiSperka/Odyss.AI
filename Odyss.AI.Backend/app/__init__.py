import logging
import sys

from quart import Quart
from quart_cors import cors
from app.routes import main
from app.utils.db import init_db_service
from setup import setup_virtualenv

def create_app():

    app = Quart(__name__)
    app = cors(app, allow_origin="*")

    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")
    app.logger.setLevel(logging.DEBUG)

    logging.debug("Starting Odyss.AI backend ...")

    # Initialize the database service
    init_db_service()

    app.config.from_object('app.config.Config')

    app.register_blueprint(main)

    logging.debug("Odyss.AI backend is running")

    return app