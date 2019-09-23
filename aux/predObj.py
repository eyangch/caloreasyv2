import tensorflow as tf
from tensorflow import keras
import numpy as np

tf.logging.set_verbosity(tf.logging.ERROR)

def loadModel():
    global model
    model = keras.models.load_model("model.hd5")

def detObj(image, t):
    #print(image)
    pred = model.predict(np.array([image]))
    #print(pred)
    return pred[0] >= t
